'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { uploadImage } from '@/lib/cloudinary';
import { logActivity } from '@/lib/activity';
import { ActivityAction } from '@/generated/prisma/enums';
import { projectFormSchema } from './schema';

export type ProjectActionResult = { error?: string };

async function requireSession() {
  const session = await getSession();
  if (!session) {
    throw new Error('Not authenticated');
  }
  return session;
}

function splitLines(value: string) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function splitCommaList(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseProjectFormData(formData: FormData) {
  return projectFormSchema.parse({
    slug: formData.get('slug'),
    name: formData.get('name'),
    category: formData.get('category'),
    badge: formData.get('badge'),
    oneLiner: formData.get('oneLiner'),
    problem: formData.get('problem'),
    whatWeBuilt: formData.get('whatWeBuilt'),
    stack: formData.get('stack'),
    outcome: formData.get('outcome'),
    href: formData.get('href') ?? '',
    featured: formData.get('featured') === 'on',
    order: formData.get('order') ? Number(formData.get('order')) : undefined,
  });
}

async function uploadImageIfPresent(formData: FormData) {
  const image = formData.get('image');
  if (image instanceof File && image.size > 0) {
    return uploadImage(image, 'tedprime/projects');
  }
  return undefined;
}

export async function createProject(formData: FormData): Promise<ProjectActionResult> {
  const session = await requireSession();

  let data;
  try {
    data = parseProjectFormData(formData);
  } catch {
    return { error: 'Please check the form for errors.' };
  }

  const imageUrl = await uploadImageIfPresent(formData);

  try {
    await prisma.project.create({
      data: {
        slug: data.slug,
        name: data.name,
        category: data.category,
        badge: data.badge,
        oneLiner: data.oneLiner,
        problem: data.problem,
        whatWeBuilt: splitLines(data.whatWeBuilt),
        stack: splitCommaList(data.stack),
        outcome: data.outcome,
        href: data.href || null,
        imageUrl,
        featured: Boolean(data.featured),
        order: data.order ?? 0,
      },
    });
  } catch {
    return { error: 'Could not save — the slug may already be in use.' };
  }

  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.CREATED,
    entityType: 'Project',
    entityLabel: data.name,
    href: '/admin/projects',
  });

  revalidatePath('/admin/projects');
  revalidatePath('/projects');
  revalidatePath('/');
  redirect('/admin/projects');
}

export async function updateProject(
  id: string,
  formData: FormData
): Promise<ProjectActionResult> {
  const session = await requireSession();

  let data;
  try {
    data = parseProjectFormData(formData);
  } catch {
    return { error: 'Please check the form for errors.' };
  }

  const imageUrl = await uploadImageIfPresent(formData);

  try {
    await prisma.project.update({
      where: { id },
      data: {
        slug: data.slug,
        name: data.name,
        category: data.category,
        badge: data.badge,
        oneLiner: data.oneLiner,
        problem: data.problem,
        whatWeBuilt: splitLines(data.whatWeBuilt),
        stack: splitCommaList(data.stack),
        outcome: data.outcome,
        href: data.href || null,
        ...(imageUrl ? { imageUrl } : {}),
        featured: Boolean(data.featured),
        order: data.order ?? 0,
      },
    });
  } catch {
    return { error: 'Could not save — the slug may already be in use.' };
  }

  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.UPDATED,
    entityType: 'Project',
    entityLabel: data.name,
    href: '/admin/projects',
  });

  revalidatePath('/admin/projects');
  revalidatePath('/projects');
  revalidatePath('/');
  redirect('/admin/projects');
}

export async function deleteProject(id: string) {
  const session = await requireSession();
  const project = await prisma.project.delete({ where: { id } });
  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.DELETED,
    entityType: 'Project',
    entityLabel: project.name,
  });
  revalidatePath('/admin/projects');
  revalidatePath('/projects');
  revalidatePath('/');
}

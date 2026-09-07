'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { logActivity } from '@/lib/activity';
import { ActivityAction } from '@/generated/prisma/enums';
import { programFormSchema } from './schema';

export type ProgramActionResult = { error?: string };

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error('Not authenticated');
  return session;
}

function parseFormData(formData: FormData) {
  return programFormSchema.parse({
    name: formData.get('name'),
    slug: formData.get('slug'),
    order: formData.get('order') ? Number(formData.get('order')) : undefined,
  });
}

export async function createProgram(formData: FormData): Promise<ProgramActionResult> {
  const session = await requireSession();

  let data;
  try {
    data = parseFormData(formData);
  } catch {
    return { error: 'Please check the form for errors.' };
  }

  try {
    await prisma.program.create({ data: { ...data, order: data.order ?? 0 } });
  } catch {
    return { error: 'Could not save — that slug may already be in use.' };
  }

  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.CREATED,
    entityType: 'Program',
    entityLabel: data.name,
    href: '/admin/programs',
  });

  revalidatePath('/admin/programs');
  revalidatePath('/projects');
  redirect('/admin/programs');
}

export async function updateProgram(
  id: string,
  formData: FormData
): Promise<ProgramActionResult> {
  const session = await requireSession();

  let data;
  try {
    data = parseFormData(formData);
  } catch {
    return { error: 'Please check the form for errors.' };
  }

  try {
    await prisma.program.update({ where: { id }, data: { ...data, order: data.order ?? 0 } });
  } catch {
    return { error: 'Could not save — that slug may already be in use.' };
  }

  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.UPDATED,
    entityType: 'Program',
    entityLabel: data.name,
    href: '/admin/programs',
  });

  revalidatePath('/admin/programs');
  revalidatePath('/projects');
  redirect('/admin/programs');
}

export async function deleteProgram(id: string) {
  const session = await requireSession();
  const program = await prisma.program.delete({ where: { id } });
  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.DELETED,
    entityType: 'Program',
    entityLabel: program.name,
  });
  revalidatePath('/admin/programs');
  revalidatePath('/projects');
}

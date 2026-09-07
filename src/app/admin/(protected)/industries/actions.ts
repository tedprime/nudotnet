'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { logActivity } from '@/lib/activity';
import { ActivityAction } from '@/generated/prisma/enums';
import { industryFormSchema } from './schema';

export type IndustryActionResult = { error?: string };

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error('Not authenticated');
  return session;
}

function parseFormData(formData: FormData) {
  return industryFormSchema.parse({
    title: formData.get('title'),
    description: formData.get('description'),
    order: formData.get('order') ? Number(formData.get('order')) : undefined,
  });
}

export async function createIndustry(formData: FormData): Promise<IndustryActionResult> {
  const session = await requireSession();

  let data;
  try {
    data = parseFormData(formData);
  } catch {
    return { error: 'Please check the form for errors.' };
  }

  await prisma.industry.create({ data: { ...data, order: data.order ?? 0 } });

  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.CREATED,
    entityType: 'Industry',
    entityLabel: data.title,
    href: '/admin/industries',
  });

  revalidatePath('/admin/industries');
  revalidatePath('/solutions');
  redirect('/admin/industries');
}

export async function updateIndustry(
  id: string,
  formData: FormData
): Promise<IndustryActionResult> {
  const session = await requireSession();

  let data;
  try {
    data = parseFormData(formData);
  } catch {
    return { error: 'Please check the form for errors.' };
  }

  await prisma.industry.update({ where: { id }, data: { ...data, order: data.order ?? 0 } });

  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.UPDATED,
    entityType: 'Industry',
    entityLabel: data.title,
    href: '/admin/industries',
  });

  revalidatePath('/admin/industries');
  revalidatePath('/solutions');
  redirect('/admin/industries');
}

export async function deleteIndustry(id: string) {
  const session = await requireSession();
  const industry = await prisma.industry.delete({ where: { id } });
  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.DELETED,
    entityType: 'Industry',
    entityLabel: industry.title,
  });
  revalidatePath('/admin/industries');
  revalidatePath('/solutions');
}

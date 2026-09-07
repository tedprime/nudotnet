'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { logActivity } from '@/lib/activity';
import { ActivityAction } from '@/generated/prisma/enums';
import { capabilityFormSchema } from './schema';

export type CapabilityActionResult = { error?: string };

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error('Not authenticated');
  return session;
}

function parseFormData(formData: FormData) {
  return capabilityFormSchema.parse({
    section: formData.get('section'),
    icon: formData.get('icon'),
    title: formData.get('title'),
    description: formData.get('description'),
    order: formData.get('order') ? Number(formData.get('order')) : undefined,
  });
}

export async function createCapability(formData: FormData): Promise<CapabilityActionResult> {
  const session = await requireSession();

  let data;
  try {
    data = parseFormData(formData);
  } catch {
    return { error: 'Please check the form for errors.' };
  }

  await prisma.capability.create({ data: { ...data, order: data.order ?? 0 } });

  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.CREATED,
    entityType: 'Capability',
    entityLabel: data.title,
    href: '/admin/capabilities',
  });

  revalidatePath('/admin/capabilities');
  revalidatePath('/');
  revalidatePath('/solutions');
  redirect('/admin/capabilities');
}

export async function updateCapability(
  id: string,
  formData: FormData
): Promise<CapabilityActionResult> {
  const session = await requireSession();

  let data;
  try {
    data = parseFormData(formData);
  } catch {
    return { error: 'Please check the form for errors.' };
  }

  await prisma.capability.update({ where: { id }, data: { ...data, order: data.order ?? 0 } });

  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.UPDATED,
    entityType: 'Capability',
    entityLabel: data.title,
    href: '/admin/capabilities',
  });

  revalidatePath('/admin/capabilities');
  revalidatePath('/');
  revalidatePath('/solutions');
  redirect('/admin/capabilities');
}

export async function deleteCapability(id: string) {
  const session = await requireSession();
  const capability = await prisma.capability.delete({ where: { id } });
  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.DELETED,
    entityType: 'Capability',
    entityLabel: capability.title,
  });
  revalidatePath('/admin/capabilities');
  revalidatePath('/');
  revalidatePath('/solutions');
}

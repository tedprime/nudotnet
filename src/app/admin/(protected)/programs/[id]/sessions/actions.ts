'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { logActivity } from '@/lib/activity';
import { ActivityAction } from '@/generated/prisma/enums';
import { sessionFormSchema } from './schema';

export type SessionActionResult = { error?: string };

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error('Not authenticated');
  return session;
}

function parseFormData(formData: FormData) {
  return sessionFormSchema.parse({
    name: formData.get('name'),
    description: formData.get('description'),
    order: formData.get('order') ? Number(formData.get('order')) : undefined,
  });
}

export async function createTrainingSession(
  programId: string,
  formData: FormData
): Promise<SessionActionResult> {
  const session = await requireSession();

  let data;
  try {
    data = parseFormData(formData);
  } catch {
    return { error: 'Please check the form for errors.' };
  }

  await prisma.trainingSession.create({
    data: { ...data, order: data.order ?? 0, programId },
  });

  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.CREATED,
    entityType: 'Training Session',
    entityLabel: data.name,
    href: `/admin/programs/${programId}/sessions`,
  });

  revalidatePath(`/admin/programs/${programId}/sessions`);
  revalidatePath('/projects');
  redirect(`/admin/programs/${programId}/sessions`);
}

export async function updateTrainingSession(
  programId: string,
  sessionId: string,
  formData: FormData
): Promise<SessionActionResult> {
  const session = await requireSession();

  let data;
  try {
    data = parseFormData(formData);
  } catch {
    return { error: 'Please check the form for errors.' };
  }

  await prisma.trainingSession.update({
    where: { id: sessionId },
    data: { ...data, order: data.order ?? 0 },
  });

  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.UPDATED,
    entityType: 'Training Session',
    entityLabel: data.name,
    href: `/admin/programs/${programId}/sessions`,
  });

  revalidatePath(`/admin/programs/${programId}/sessions`);
  revalidatePath('/projects');
  redirect(`/admin/programs/${programId}/sessions`);
}

export async function deleteTrainingSession(programId: string, sessionId: string) {
  const session = await requireSession();
  const trainingSession = await prisma.trainingSession.delete({ where: { id: sessionId } });
  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.DELETED,
    entityType: 'Training Session',
    entityLabel: trainingSession.name,
  });
  revalidatePath(`/admin/programs/${programId}/sessions`);
  revalidatePath('/projects');
}

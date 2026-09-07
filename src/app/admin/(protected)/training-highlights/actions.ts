'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { uploadImage } from '@/lib/cloudinary';
import { logActivity } from '@/lib/activity';
import { ActivityAction } from '@/generated/prisma/enums';
import { trainingHighlightFormSchema } from './schema';

export type TrainingHighlightActionResult = { error?: string };

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error('Not authenticated');
  return session;
}

function parseFormData(formData: FormData) {
  return trainingHighlightFormSchema.parse({
    title: formData.get('title'),
    description: formData.get('description'),
    order: formData.get('order') ? Number(formData.get('order')) : undefined,
  });
}

export async function createTrainingHighlight(
  formData: FormData
): Promise<TrainingHighlightActionResult> {
  const session = await requireSession();

  let data;
  try {
    data = parseFormData(formData);
  } catch {
    return { error: 'Please check the form for errors.' };
  }

  const photo = formData.get('photo');
  if (!(photo instanceof File) || photo.size === 0) {
    return { error: 'A photo is required.' };
  }
  const imageUrl = await uploadImage(photo, 'tedprime/training-highlights');

  await prisma.trainingHighlight.create({
    data: { ...data, order: data.order ?? 0, imageUrl },
  });

  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.CREATED,
    entityType: 'Training Highlight',
    entityLabel: data.title,
    href: '/admin/training-highlights',
  });

  revalidatePath('/admin/training-highlights');
  revalidatePath('/');
  redirect('/admin/training-highlights');
}

export async function updateTrainingHighlight(
  id: string,
  formData: FormData
): Promise<TrainingHighlightActionResult> {
  const session = await requireSession();

  let data;
  try {
    data = parseFormData(formData);
  } catch {
    return { error: 'Please check the form for errors.' };
  }

  const photo = formData.get('photo');
  const imageUrl =
    photo instanceof File && photo.size > 0
      ? await uploadImage(photo, 'tedprime/training-highlights')
      : undefined;

  await prisma.trainingHighlight.update({
    where: { id },
    data: { ...data, order: data.order ?? 0, ...(imageUrl ? { imageUrl } : {}) },
  });

  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.UPDATED,
    entityType: 'Training Highlight',
    entityLabel: data.title,
    href: '/admin/training-highlights',
  });

  revalidatePath('/admin/training-highlights');
  revalidatePath('/');
  redirect('/admin/training-highlights');
}

export async function deleteTrainingHighlight(id: string) {
  const session = await requireSession();
  const highlight = await prisma.trainingHighlight.delete({ where: { id } });
  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.DELETED,
    entityType: 'Training Highlight',
    entityLabel: highlight.title,
  });
  revalidatePath('/admin/training-highlights');
  revalidatePath('/');
}

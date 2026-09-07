'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { uploadImage } from '@/lib/cloudinary';
import { logActivity } from '@/lib/activity';
import { ActivityAction } from '@/generated/prisma/enums';
import { galleryImageFormSchema } from './schema';

export type GalleryImageActionResult = { error?: string };

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error('Not authenticated');
  return session;
}

function parseFormData(formData: FormData) {
  return galleryImageFormSchema.parse({
    group: formData.get('group') ?? '',
    order: formData.get('order') ? Number(formData.get('order')) : undefined,
  });
}

export async function createGalleryImage(
  programId: string,
  formData: FormData
): Promise<GalleryImageActionResult> {
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
  const imageUrl = await uploadImage(photo, 'tedprime/training-gallery');

  await prisma.trainingGalleryImage.create({
    data: { programId, group: data.group || null, order: data.order ?? 0, imageUrl },
  });

  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.CREATED,
    entityType: 'Gallery Image',
    entityLabel: data.group || 'Untitled group',
    href: `/admin/programs/${programId}/gallery`,
  });

  revalidatePath(`/admin/programs/${programId}/gallery`);
  revalidatePath('/projects');
  redirect(`/admin/programs/${programId}/gallery`);
}

export async function updateGalleryImage(
  programId: string,
  imageId: string,
  formData: FormData
): Promise<GalleryImageActionResult> {
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
      ? await uploadImage(photo, 'tedprime/training-gallery')
      : undefined;

  await prisma.trainingGalleryImage.update({
    where: { id: imageId },
    data: {
      group: data.group || null,
      order: data.order ?? 0,
      ...(imageUrl ? { imageUrl } : {}),
    },
  });

  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.UPDATED,
    entityType: 'Gallery Image',
    entityLabel: data.group || 'Untitled group',
    href: `/admin/programs/${programId}/gallery`,
  });

  revalidatePath(`/admin/programs/${programId}/gallery`);
  revalidatePath('/projects');
  redirect(`/admin/programs/${programId}/gallery`);
}

export async function deleteGalleryImage(programId: string, imageId: string) {
  const session = await requireSession();
  await prisma.trainingGalleryImage.delete({ where: { id: imageId } });
  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.DELETED,
    entityType: 'Gallery Image',
    entityLabel: 'Photo removed',
  });
  revalidatePath(`/admin/programs/${programId}/gallery`);
  revalidatePath('/projects');
}

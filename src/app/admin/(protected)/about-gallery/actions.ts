'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { uploadImage } from '@/lib/cloudinary';
import { logActivity } from '@/lib/activity';
import { ActivityAction } from '@/generated/prisma/enums';
import { aboutGalleryFormSchema } from './schema';

export type AboutGalleryActionResult = { error?: string };

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error('Not authenticated');
  return session;
}

function parseFormData(formData: FormData) {
  return aboutGalleryFormSchema.parse({
    alt: formData.get('alt'),
    order: formData.get('order') ? Number(formData.get('order')) : undefined,
  });
}

export async function createAboutGalleryImage(
  formData: FormData
): Promise<AboutGalleryActionResult> {
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
  const imageUrl = await uploadImage(photo, 'tedprime/about-gallery');

  await prisma.aboutGalleryImage.create({ data: { ...data, order: data.order ?? 0, imageUrl } });

  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.CREATED,
    entityType: 'About Gallery Image',
    entityLabel: data.alt,
    href: '/admin/about-gallery',
  });

  revalidatePath('/admin/about-gallery');
  revalidatePath('/');
  revalidatePath('/about');
  redirect('/admin/about-gallery');
}

export async function updateAboutGalleryImage(
  id: string,
  formData: FormData
): Promise<AboutGalleryActionResult> {
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
      ? await uploadImage(photo, 'tedprime/about-gallery')
      : undefined;

  await prisma.aboutGalleryImage.update({
    where: { id },
    data: { ...data, order: data.order ?? 0, ...(imageUrl ? { imageUrl } : {}) },
  });

  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.UPDATED,
    entityType: 'About Gallery Image',
    entityLabel: data.alt,
    href: '/admin/about-gallery',
  });

  revalidatePath('/admin/about-gallery');
  revalidatePath('/');
  revalidatePath('/about');
  redirect('/admin/about-gallery');
}

export async function deleteAboutGalleryImage(id: string) {
  const session = await requireSession();
  await prisma.aboutGalleryImage.delete({ where: { id } });
  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.DELETED,
    entityType: 'About Gallery Image',
    entityLabel: 'Photo removed',
  });
  revalidatePath('/admin/about-gallery');
  revalidatePath('/');
  revalidatePath('/about');
}

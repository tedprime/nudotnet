'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { uploadImage } from '@/lib/cloudinary';
import { logActivity } from '@/lib/activity';
import { ActivityAction } from '@/generated/prisma/enums';
import { partnerLogoFormSchema } from './schema';

export type PartnerLogoActionResult = { error?: string };

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error('Not authenticated');
  return session;
}

function parseFormData(formData: FormData) {
  return partnerLogoFormSchema.parse({
    alt: formData.get('alt'),
    order: formData.get('order') ? Number(formData.get('order')) : undefined,
  });
}

export async function createPartnerLogo(formData: FormData): Promise<PartnerLogoActionResult> {
  const session = await requireSession();

  let data;
  try {
    data = parseFormData(formData);
  } catch {
    return { error: 'Please check the form for errors.' };
  }

  const photo = formData.get('photo');
  if (!(photo instanceof File) || photo.size === 0) {
    return { error: 'A logo image is required.' };
  }
  const imageUrl = await uploadImage(photo, 'tedprime/partners');

  await prisma.partnerLogo.create({ data: { ...data, order: data.order ?? 0, imageUrl } });

  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.CREATED,
    entityType: 'Partner Logo',
    entityLabel: data.alt,
    href: '/admin/partnerships',
  });

  revalidatePath('/admin/partnerships');
  revalidatePath('/');
  redirect('/admin/partnerships');
}

export async function updatePartnerLogo(
  id: string,
  formData: FormData
): Promise<PartnerLogoActionResult> {
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
      ? await uploadImage(photo, 'tedprime/partners')
      : undefined;

  await prisma.partnerLogo.update({
    where: { id },
    data: { ...data, order: data.order ?? 0, ...(imageUrl ? { imageUrl } : {}) },
  });

  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.UPDATED,
    entityType: 'Partner Logo',
    entityLabel: data.alt,
    href: '/admin/partnerships',
  });

  revalidatePath('/admin/partnerships');
  revalidatePath('/');
  redirect('/admin/partnerships');
}

export async function deletePartnerLogo(id: string) {
  const session = await requireSession();
  const logo = await prisma.partnerLogo.delete({ where: { id } });
  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.DELETED,
    entityType: 'Partner Logo',
    entityLabel: logo.alt,
  });
  revalidatePath('/admin/partnerships');
  revalidatePath('/');
}

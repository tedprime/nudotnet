'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { uploadImage } from '@/lib/cloudinary';
import { logActivity } from '@/lib/activity';
import { ActivityAction } from '@/generated/prisma/enums';
import { writeupFormSchema } from './schema';

export type WriteupActionResult = { error?: string };

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error('Not authenticated');
  return session;
}

function parseFormData(formData: FormData) {
  return writeupFormSchema.parse({
    title: formData.get('title'),
    body: formData.get('body'),
    order: formData.get('order') ? Number(formData.get('order')) : undefined,
  });
}

export async function createWriteup(
  programId: string,
  formData: FormData
): Promise<WriteupActionResult> {
  const session = await requireSession();

  let data;
  try {
    data = parseFormData(formData);
  } catch {
    return { error: 'Please check the form for errors.' };
  }

  await prisma.programWriteup.create({
    data: { ...data, order: data.order ?? 0, programId },
  });

  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.CREATED,
    entityType: 'Program Write-Up',
    entityLabel: data.title,
    href: `/admin/programs/${programId}/writeups`,
  });

  revalidatePath(`/admin/programs/${programId}/writeups`);
  revalidatePath('/projects');
  redirect(`/admin/programs/${programId}/writeups`);
}

export async function updateWriteup(
  programId: string,
  writeupId: string,
  formData: FormData
): Promise<WriteupActionResult> {
  const session = await requireSession();

  let data;
  try {
    data = parseFormData(formData);
  } catch {
    return { error: 'Please check the form for errors.' };
  }

  await prisma.programWriteup.update({
    where: { id: writeupId },
    data: { ...data, order: data.order ?? 0 },
  });

  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.UPDATED,
    entityType: 'Program Write-Up',
    entityLabel: data.title,
    href: `/admin/programs/${programId}/writeups`,
  });

  revalidatePath(`/admin/programs/${programId}/writeups`);
  revalidatePath('/projects');
  redirect(`/admin/programs/${programId}/writeups`);
}

export async function deleteWriteup(programId: string, writeupId: string) {
  const session = await requireSession();
  const writeup = await prisma.programWriteup.delete({ where: { id: writeupId } });
  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.DELETED,
    entityType: 'Program Write-Up',
    entityLabel: writeup.title,
  });
  revalidatePath(`/admin/programs/${programId}/writeups`);
  revalidatePath('/projects');
}

// A writeup's own photo(s) — one renders as a static image on the public
// page, more than one renders as a carousel.
export async function addWriteupImage(
  programId: string,
  writeupId: string,
  formData: FormData
): Promise<WriteupActionResult> {
  await requireSession();

  const photo = formData.get('photo');
  if (!(photo instanceof File) || photo.size === 0) {
    return { error: 'A photo is required.' };
  }
  const imageUrl = await uploadImage(photo, 'tedprime/programs');

  const count = await prisma.writeupImage.count({ where: { writeupId } });
  await prisma.writeupImage.create({ data: { writeupId, order: count, imageUrl } });

  revalidatePath(`/admin/programs/${programId}/writeups/${writeupId}`);
  revalidatePath('/projects');
  return {};
}

export async function deleteWriteupImage(
  programId: string,
  writeupId: string,
  imageId: string
) {
  await requireSession();
  await prisma.writeupImage.delete({ where: { id: imageId } });
  revalidatePath(`/admin/programs/${programId}/writeups/${writeupId}`);
  revalidatePath('/projects');
}

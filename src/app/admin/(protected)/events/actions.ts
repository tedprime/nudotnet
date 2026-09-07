'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { uploadImage } from '@/lib/cloudinary';
import { logActivity } from '@/lib/activity';
import { ActivityAction } from '@/generated/prisma/enums';
import { eventFormSchema } from './schema';

export type EventActionResult = { error?: string };

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error('Not authenticated');
  return session;
}

function parseFormData(formData: FormData) {
  return eventFormSchema.parse({
    date: formData.get('date'),
    headline: formData.get('headline'),
    description: formData.get('description'),
    order: formData.get('order') ? Number(formData.get('order')) : undefined,
    hasArticle: formData.get('hasArticle') === 'on',
    slug: formData.get('slug') ?? '',
    body: formData.get('body') ?? '',
    link: formData.get('link') ?? '',
    external: formData.get('external') === 'on',
  });
}

async function uploadImageIfPresent(formData: FormData) {
  const image = formData.get('image');
  if (image instanceof File && image.size > 0) {
    return uploadImage(image, 'tedprime/events');
  }
  return undefined;
}

function buildData(data: ReturnType<typeof eventFormSchema.parse>) {
  return {
    date: data.date,
    headline: data.headline,
    description: data.description,
    order: data.order ?? 0,
    slug: data.hasArticle ? data.slug || null : null,
    body: data.hasArticle ? data.body || null : null,
    link: data.hasArticle ? null : data.link || null,
    external: data.hasArticle ? false : Boolean(data.external),
  };
}

export async function createEvent(formData: FormData): Promise<EventActionResult> {
  const session = await requireSession();

  let data;
  try {
    data = parseFormData(formData);
  } catch {
    return { error: 'Please check the form for errors.' };
  }

  const imageUrl = await uploadImageIfPresent(formData);

  try {
    await prisma.event.create({ data: { ...buildData(data), imageUrl } });
  } catch {
    return { error: 'Could not save — that slug may already be in use.' };
  }

  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.CREATED,
    entityType: 'Event',
    entityLabel: data.headline,
    href: '/admin/events',
  });

  revalidatePath('/admin/events');
  revalidatePath('/');
  revalidatePath('/News/BAC');
  redirect('/admin/events');
}

export async function updateEvent(
  id: string,
  formData: FormData
): Promise<EventActionResult> {
  const session = await requireSession();

  let data;
  try {
    data = parseFormData(formData);
  } catch {
    return { error: 'Please check the form for errors.' };
  }

  const imageUrl = await uploadImageIfPresent(formData);

  try {
    await prisma.event.update({
      where: { id },
      data: { ...buildData(data), ...(imageUrl ? { imageUrl } : {}) },
    });
  } catch {
    return { error: 'Could not save — that slug may already be in use.' };
  }

  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.UPDATED,
    entityType: 'Event',
    entityLabel: data.headline,
    href: '/admin/events',
  });

  revalidatePath('/admin/events');
  revalidatePath('/');
  if (data.hasArticle && data.slug) revalidatePath(`/News/${data.slug}`);
  redirect('/admin/events');
}

export async function deleteEvent(id: string) {
  const session = await requireSession();
  const event = await prisma.event.delete({ where: { id } });
  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.DELETED,
    entityType: 'Event',
    entityLabel: event.headline,
  });
  revalidatePath('/admin/events');
  revalidatePath('/');
}

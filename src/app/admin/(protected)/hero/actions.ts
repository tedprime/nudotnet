'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { uploadImage } from '@/lib/cloudinary';
import { logActivity } from '@/lib/activity';
import { ActivityAction } from '@/generated/prisma/enums';
import { pageHeroFormSchema } from './schema';

export type PageHeroActionResult = { error?: string };

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error('Not authenticated');
  return session;
}

function parseFormData(formData: FormData) {
  return pageHeroFormSchema.parse({
    page: formData.get('page'),
    order: formData.get('order') ? Number(formData.get('order')) : undefined,
    eyebrow: formData.get('eyebrow'),
    body: formData.get('body'),
    bgColor: formData.get('bgColor') ?? '',
    ctaLabel: formData.get('ctaLabel') ?? '',
    ctaHref: formData.get('ctaHref') ?? '',
    ctaExternal: formData.get('ctaExternal') === 'on',
  });
}

async function uploadImageIfPresent(formData: FormData) {
  const image = formData.get('image');
  if (image instanceof File && image.size > 0) {
    return uploadImage(image, 'tedprime/hero');
  }
  return undefined;
}

export async function createPageHero(formData: FormData): Promise<PageHeroActionResult> {
  const session = await requireSession();

  let data;
  try {
    data = parseFormData(formData);
  } catch {
    return { error: 'Please check the form for errors.' };
  }

  const image = await uploadImageIfPresent(formData);
  if (!image) {
    return { error: 'A photo is required.' };
  }

  try {
    await prisma.pageHero.create({
      data: {
        page: data.page,
        order: data.order ?? 0,
        eyebrow: data.eyebrow,
        body: data.body,
        image,
        bgColor: data.bgColor || null,
        ctaLabel: data.ctaLabel || null,
        ctaHref: data.ctaHref || null,
        ctaExternal: Boolean(data.ctaExternal),
      },
    });
  } catch {
    return { error: 'Could not save — that page + order combination already exists.' };
  }

  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.CREATED,
    entityType: 'Page Hero',
    entityLabel: `${data.page} — ${data.eyebrow}`,
    href: '/admin/hero',
  });

  revalidatePath('/admin/hero');
  revalidatePath('/');
  redirect('/admin/hero');
}

export async function updatePageHero(
  id: string,
  formData: FormData
): Promise<PageHeroActionResult> {
  const session = await requireSession();

  let data;
  try {
    data = parseFormData(formData);
  } catch {
    return { error: 'Please check the form for errors.' };
  }

  const image = await uploadImageIfPresent(formData);

  try {
    await prisma.pageHero.update({
      where: { id },
      data: {
        page: data.page,
        order: data.order ?? 0,
        eyebrow: data.eyebrow,
        body: data.body,
        ...(image ? { image } : {}),
        bgColor: data.bgColor || null,
        ctaLabel: data.ctaLabel || null,
        ctaHref: data.ctaHref || null,
        ctaExternal: Boolean(data.ctaExternal),
      },
    });
  } catch {
    return { error: 'Could not save — that page + order combination already exists.' };
  }

  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.UPDATED,
    entityType: 'Page Hero',
    entityLabel: `${data.page} — ${data.eyebrow}`,
    href: '/admin/hero',
  });

  revalidatePath('/admin/hero');
  revalidatePath('/');
  redirect('/admin/hero');
}

export async function deletePageHero(id: string) {
  const session = await requireSession();
  const hero = await prisma.pageHero.delete({ where: { id } });
  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.DELETED,
    entityType: 'Page Hero',
    entityLabel: `${hero.page} — ${hero.eyebrow}`,
  });
  revalidatePath('/admin/hero');
  revalidatePath('/');
}

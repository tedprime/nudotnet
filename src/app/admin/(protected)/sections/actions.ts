'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { logActivity } from '@/lib/activity';
import { ActivityAction } from '@/generated/prisma/enums';
import { sectionIntroFormSchema } from './schema';

export type SectionIntroActionResult = { error?: string };

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error('Not authenticated');
  return session;
}

export async function updateSectionIntro(
  id: string,
  formData: FormData
): Promise<SectionIntroActionResult> {
  const session = await requireSession();

  let data;
  try {
    data = sectionIntroFormSchema.parse({
      eyebrow: formData.get('eyebrow'),
      heading: formData.get('heading') ?? '',
      body: formData.get('body'),
      secondaryBody: formData.get('secondaryBody') ?? '',
    });
  } catch {
    return { error: 'Please check the form for errors.' };
  }

  await prisma.sectionIntro.update({
    where: { id },
    data: {
      eyebrow: data.eyebrow,
      heading: data.heading || null,
      body: data.body,
      secondaryBody: data.secondaryBody || null,
    },
  });

  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.UPDATED,
    entityType: 'Section Intro',
    entityLabel: data.eyebrow,
    href: '/admin/sections',
  });

  revalidatePath('/admin/sections');
  revalidatePath('/');
  redirect('/admin/sections');
}

'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { uploadImage } from '@/lib/cloudinary';
import { logActivity } from '@/lib/activity';
import { ActivityAction } from '@/generated/prisma/enums';
import { staffFormSchema } from './schema';

export type StaffActionResult = { error?: string };

async function requireSession() {
  const session = await getSession();
  if (!session) {
    throw new Error('Not authenticated');
  }
  return session;
}

function parseStaffFormData(formData: FormData) {
  return staffFormSchema.parse({
    fullName: formData.get('fullName'),
    slug: formData.get('slug'),
    staffId: formData.get('staffId'),
    title: formData.get('title'),
    department: formData.get('department'),
    location: formData.get('location'),
    employmentType: formData.get('employmentType'),
    status: formData.get('status'),
    startDate: formData.get('startDate'),
    bio: formData.get('bio') ?? '',
    email: formData.get('email') ?? '',
    phone: formData.get('phone') ?? '',
    featured: formData.get('featured') === 'on',
  });
}

async function uploadPhotoIfPresent(formData: FormData) {
  const photo = formData.get('photo');
  if (photo instanceof File && photo.size > 0) {
    return uploadImage(photo, 'tedprime/staff');
  }
  return undefined;
}

export async function createStaff(formData: FormData): Promise<StaffActionResult> {
  const session = await requireSession();

  let data;
  try {
    data = parseStaffFormData(formData);
  } catch {
    return { error: 'Please check the form for errors.' };
  }

  const photoUrl = await uploadPhotoIfPresent(formData);

  try {
    await prisma.staffMember.create({
      data: {
        fullName: data.fullName,
        slug: data.slug,
        staffId: data.staffId,
        title: data.title,
        department: data.department,
        location: data.location,
        employmentType: data.employmentType,
        status: data.status,
        startDate: new Date(data.startDate),
        bio: data.bio || null,
        email: data.email || null,
        phone: data.phone || null,
        photoUrl,
        featured: Boolean(data.featured),
      },
    });
  } catch {
    return { error: 'Could not save — the slug or staff ID may already be in use.' };
  }

  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.CREATED,
    entityType: 'Staff Member',
    entityLabel: data.fullName,
    href: '/admin/staff',
  });

  revalidatePath('/admin/staff');
  revalidatePath('/');
  redirect('/admin/staff');
}

export async function updateStaff(
  id: string,
  formData: FormData
): Promise<StaffActionResult> {
  const session = await requireSession();

  let data;
  try {
    data = parseStaffFormData(formData);
  } catch {
    return { error: 'Please check the form for errors.' };
  }

  const photoUrl = await uploadPhotoIfPresent(formData);

  try {
    await prisma.staffMember.update({
      where: { id },
      data: {
        fullName: data.fullName,
        slug: data.slug,
        staffId: data.staffId,
        title: data.title,
        department: data.department,
        location: data.location,
        employmentType: data.employmentType,
        status: data.status,
        startDate: new Date(data.startDate),
        bio: data.bio || null,
        email: data.email || null,
        phone: data.phone || null,
        ...(photoUrl ? { photoUrl } : {}),
        featured: Boolean(data.featured),
      },
    });
  } catch {
    return { error: 'Could not save — the slug or staff ID may already be in use.' };
  }

  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.UPDATED,
    entityType: 'Staff Member',
    entityLabel: data.fullName,
    href: '/admin/staff',
  });

  revalidatePath('/admin/staff');
  revalidatePath(`/staff/${data.slug}`);
  revalidatePath('/');
  redirect('/admin/staff');
}

export async function deleteStaff(id: string) {
  const session = await requireSession();
  const staff = await prisma.staffMember.delete({ where: { id } });
  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.DELETED,
    entityType: 'Staff Member',
    entityLabel: staff.fullName,
  });
  revalidatePath('/admin/staff');
  revalidatePath('/');
}

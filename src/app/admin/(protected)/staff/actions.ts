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

function normalizeText(value: FormDataEntryValue | null) {
  return typeof value === 'string' ? value.trim() : '';
}

async function requireSession() {
  const session = await getSession();
  if (!session) {
    throw new Error('Not authenticated');
  }
  return session;
}

function parseStaffFormData(formData: FormData) {
  return staffFormSchema.parse({
    fullName: normalizeText(formData.get('fullName')),
    slug: normalizeText(formData.get('slug')),
    staffId: normalizeText(formData.get('staffId')),
    title: normalizeText(formData.get('title')),
    department: normalizeText(formData.get('department')),
    location: normalizeText(formData.get('location')),
    employmentType: normalizeText(formData.get('employmentType')),
    status: normalizeText(formData.get('status')),
    startDate: normalizeText(formData.get('startDate')),
    bio: normalizeText(formData.get('bio')),
    email: normalizeText(formData.get('email')),
    phone: normalizeText(formData.get('phone')),
    featured: formData.get('featured') === 'on',
  });
}

async function findDuplicateStaffConflict(
  { slug, staffId }: { slug: string; staffId: string },
  excludeId?: string
) {
  const where: Record<string, unknown> = {
    OR: [
      { slug: { equals: slug, mode: 'insensitive' } },
      { staffId: { equals: staffId, mode: 'insensitive' } },
    ],
  };

  if (excludeId) {
    where.id = { not: excludeId };
  }

  const existing = await prisma.staffMember.findFirst({
    where,
    select: { id: true, slug: true, staffId: true },
  });

  if (!existing) return null;

  const conflicts: string[] = [];
  if (existing.slug && existing.slug.toLowerCase() === slug.toLowerCase()) {
    conflicts.push('slug');
  }
  if (existing.staffId && existing.staffId.toLowerCase() === staffId.toLowerCase()) {
    conflicts.push('staff ID');
  }

  return conflicts.length > 0 ? conflicts : null;
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

  const duplicateField = await findDuplicateStaffConflict({
    slug: data.slug,
    staffId: data.staffId,
  });

  if (duplicateField) {
    return {
      error:
        duplicateField.length === 2
          ? 'This slug and staff ID are already in use.'
          : duplicateField[0] === 'slug'
            ? 'This slug is already in use.'
            : 'This staff ID is already in use.',
    };
  }

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
        startDate: data.startDate ? new Date(data.startDate) : null,
        bio: data.bio || null,
        email: data.email || null,
        phone: data.phone || null,
        photoUrl,
        featured: Boolean(data.featured),
      },
    });
  } catch (error) {
    const prismaError = error as { code?: string; message?: string };
    console.error('Create staff failed:', error);

    if (prismaError?.code === 'P2002') {
      return {
        error: 'A staff member with this slug or staff ID already exists.',
      };
    }

    return {
      error: prismaError?.message
        ? `Could not save the staff member: ${prismaError.message}`
        : 'Could not save the staff member. Please check the form and try again.',
    };
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

  const duplicateField = await findDuplicateStaffConflict(
    {
      slug: data.slug,
      staffId: data.staffId,
    },
    id
  );

  if (duplicateField) {
    return {
      error:
        duplicateField.length === 2
          ? 'This slug and staff ID are already in use.'
          : duplicateField[0] === 'slug'
            ? 'This slug is already in use.'
            : 'This staff ID is already in use.',
    };
  }

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
        startDate: data.startDate ? new Date(data.startDate) : null,
        bio: data.bio || null,
        email: data.email || null,
        phone: data.phone || null,
        ...(photoUrl ? { photoUrl } : {}),
        featured: Boolean(data.featured),
      },
    });
  } catch (error) {
    const prismaError = error as { code?: string; message?: string };
    console.error('Update staff failed:', error);

    if (prismaError?.code === 'P2002') {
      return {
        error: 'A staff member with this slug or staff ID already exists.',
      };
    }

    return {
      error: prismaError?.message
        ? `Could not save the staff member: ${prismaError.message}`
        : 'Could not save the staff member. Please check the form and try again.',
    };
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

'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { hashPassword } from '@/lib/password';
import { logActivity } from '@/lib/activity';
import { Role, ActivityAction } from '@/generated/prisma/enums';
import { createAdminUserSchema } from './schema';

export type UserActionResult = { error?: string };

async function requireSuperAdmin() {
  const session = await getSession();
  if (!session || session.role !== Role.SUPER_ADMIN) {
    throw new Error('Not authorized');
  }
  return session;
}

export async function createAdminUser(formData: FormData): Promise<UserActionResult> {
  const session = await requireSuperAdmin();

  const parsed = createAdminUserSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
  });

  if (!parsed.success) {
    return { error: 'Please check the form for errors.' };
  }

  const passwordHash = await hashPassword(parsed.data.password);

  try {
    await prisma.adminUser.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        passwordHash,
        role: parsed.data.role,
      },
    });
  } catch {
    return { error: 'Could not save — that email is already in use.' };
  }

  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.CREATED,
    entityType: 'Admin User',
    entityLabel: parsed.data.name,
    href: '/admin/users',
  });

  revalidatePath('/admin/users');
  redirect('/admin/users');
}

export async function deleteAdminUser(id: string): Promise<UserActionResult> {
  const session = await requireSuperAdmin();

  if (session.sub === id) {
    return { error: "You can't remove your own account." };
  }

  const user = await prisma.adminUser.delete({ where: { id } });
  await logActivity({
    actorId: session.sub,
    actorName: session.name,
    action: ActivityAction.DELETED,
    entityType: 'Admin User',
    entityLabel: user.name,
  });
  revalidatePath('/admin/users');
  return {};
}

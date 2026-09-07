import 'server-only';
import { prisma } from '@/lib/prisma';

export async function getAllStaff() {
  try {
    return await prisma.staffMember.findMany({ orderBy: { fullName: 'asc' } });
  } catch (error) {
    console.error('getAllStaff failed', error);
    return [];
  }
}

export async function getStaffById(id: string) {
  try {
    return await prisma.staffMember.findUnique({ where: { id } });
  } catch (error) {
    console.error('getStaffById failed', error);
    return null;
  }
}

export async function getStaffBySlug(slug: string) {
  try {
    return await prisma.staffMember.findUnique({ where: { slug } });
  } catch (error) {
    console.error('getStaffBySlug failed', error);
    return null;
  }
}

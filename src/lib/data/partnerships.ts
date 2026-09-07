import 'server-only';
import { prisma } from '@/lib/prisma';

export function getPartnerLogos() {
  return prisma.partnerLogo.findMany({ orderBy: { order: 'asc' } });
}

export function getPartnerLogoById(id: string) {
  return prisma.partnerLogo.findUnique({ where: { id } });
}

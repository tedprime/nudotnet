import 'server-only';
import { prisma } from '@/lib/prisma';
import { CapabilitySection } from '@/generated/prisma/enums';

export function getCapabilities(section?: CapabilitySection) {
  return prisma.capability.findMany({
    where: section ? { section } : undefined,
    orderBy: { order: 'asc' },
  });
}

export function getAllCapabilities() {
  return prisma.capability.findMany({ orderBy: [{ section: 'asc' }, { order: 'asc' }] });
}

export function getCapabilityById(id: string) {
  return prisma.capability.findUnique({ where: { id } });
}

export function getIndustries() {
  return prisma.industry.findMany({ orderBy: { order: 'asc' } });
}

export function getIndustryById(id: string) {
  return prisma.industry.findUnique({ where: { id } });
}

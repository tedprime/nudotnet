import 'server-only';
import { prisma } from '@/lib/prisma';
import { SectionKey } from '@/generated/prisma/enums';

export function getSectionIntro(section: SectionKey) {
  return prisma.sectionIntro.findUnique({ where: { section } });
}

export function getAllSectionIntros() {
  return prisma.sectionIntro.findMany({ orderBy: { section: 'asc' } });
}

export function getSectionIntroById(id: string) {
  return prisma.sectionIntro.findUnique({ where: { id } });
}

export function getAboutGalleryImages() {
  return prisma.aboutGalleryImage.findMany({ orderBy: { order: 'asc' } });
}

export function getAboutGalleryImageById(id: string) {
  return prisma.aboutGalleryImage.findUnique({ where: { id } });
}

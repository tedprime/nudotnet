import 'server-only';
import { prisma } from '@/lib/prisma';

// Program — the dynamic list of training/capacity programs shown as tabs on
// /projects (AGILE, 3MTT, Digital Centers, and whatever gets added later).
export function getPrograms() {
  return prisma.program.findMany({ orderBy: { order: 'asc' } });
}

export function getProgramById(id: string) {
  return prisma.program.findUnique({ where: { id } });
}

export function getProgramBySlug(slug: string) {
  return prisma.program.findUnique({ where: { slug } });
}

// TrainingSession — a program's day-by-day recap
export function getTrainingSessions(programId: string) {
  return prisma.trainingSession.findMany({ where: { programId }, orderBy: { order: 'asc' } });
}

export function getTrainingSessionById(id: string) {
  return prisma.trainingSession.findUnique({ where: { id } });
}

// TrainingGalleryImage — a program's photo gallery
export function getGalleryImages(programId: string) {
  return prisma.trainingGalleryImage.findMany({
    where: { programId },
    orderBy: { order: 'asc' },
  });
}

export function getGalleryImageById(id: string) {
  return prisma.trainingGalleryImage.findUnique({ where: { id } });
}

// ProgramWriteup — a program's write-up(s), each with its own photo(s)
export function getProgramWriteups(programId: string) {
  return prisma.programWriteup.findMany({
    where: { programId },
    include: { images: { orderBy: { order: 'asc' } } },
    orderBy: { order: 'asc' },
  });
}

export function getProgramWriteupById(id: string) {
  return prisma.programWriteup.findUnique({
    where: { id },
    include: { images: { orderBy: { order: 'asc' } } },
  });
}

// TrainingHighlight — the home-page "Training & Capacity Development" teaser carousel
export function getTrainingHighlights() {
  return prisma.trainingHighlight.findMany({ orderBy: { order: 'asc' } });
}

export function getTrainingHighlightById(id: string) {
  return prisma.trainingHighlight.findUnique({ where: { id } });
}

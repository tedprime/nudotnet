import 'server-only';
import { prisma } from '@/lib/prisma';

export function getAllProjects() {
  return prisma.project.findMany({ orderBy: { order: 'asc' } });
}

export function getFeaturedProjects() {
  return prisma.project.findMany({
    where: { featured: true },
    orderBy: { order: 'asc' },
  });
}

export function getProjectById(id: string) {
  return prisma.project.findUnique({ where: { id } });
}

export function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({ where: { slug } });
}

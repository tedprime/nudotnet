import 'server-only';
import { prisma } from '@/lib/prisma';

export function getEvents() {
  return prisma.event.findMany({ orderBy: { order: 'asc' } });
}

export function getEventById(id: string) {
  return prisma.event.findUnique({ where: { id } });
}

/** For /News/[slug] — an Event with `slug` + `body` set has its own article page. */
export function getEventBySlug(slug: string) {
  return prisma.event.findUnique({ where: { slug } });
}

'use server';

import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

export type SearchResult = { id: string; label: string; sublabel: string; href: string };

export async function searchAdminContent(query: string): Promise<SearchResult[]> {
  const session = await getSession();
  if (!session) return [];

  const q = query.trim();
  if (q.length < 2) return [];

  const [staff, projects, programs, events] = await Promise.all([
    prisma.staffMember.findMany({
      where: { fullName: { contains: q, mode: 'insensitive' } },
      take: 5,
      select: { id: true, fullName: true, title: true },
    }),
    prisma.project.findMany({
      where: { name: { contains: q, mode: 'insensitive' } },
      take: 5,
      select: { id: true, name: true, category: true },
    }),
    prisma.program.findMany({
      where: { name: { contains: q, mode: 'insensitive' } },
      take: 5,
      select: { id: true, name: true },
    }),
    prisma.event.findMany({
      where: { headline: { contains: q, mode: 'insensitive' } },
      take: 5,
      select: { id: true, headline: true, date: true },
    }),
  ]);

  return [
    ...staff.map((s) => ({
      id: `staff-${s.id}`,
      label: s.fullName,
      sublabel: `Staff · ${s.title}`,
      href: `/admin/staff/${s.id}`,
    })),
    ...projects.map((p) => ({
      id: `project-${p.id}`,
      label: p.name,
      sublabel: `Project · ${p.category}`,
      href: `/admin/projects/${p.id}`,
    })),
    ...programs.map((p) => ({
      id: `program-${p.id}`,
      label: p.name,
      sublabel: 'Program',
      href: `/admin/programs/${p.id}`,
    })),
    ...events.map((e) => ({
      id: `event-${e.id}`,
      label: e.headline,
      sublabel: `Event · ${e.date}`,
      href: `/admin/events/${e.id}`,
    })),
  ];
}

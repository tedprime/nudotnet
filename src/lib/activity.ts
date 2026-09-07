import 'server-only';
import { prisma } from '@/lib/prisma';
import { ActivityAction } from '@/generated/prisma/enums';

type LogActivityInput = {
  actorId?: string | null;
  actorName: string;
  action: ActivityAction;
  entityType: string;
  entityLabel: string;
  href?: string | null;
};

/** Fire-and-forget-ish activity log write — never blocks or fails the caller's mutation. */
export async function logActivity(input: LogActivityInput) {
  try {
    await prisma.activityLog.create({
      data: {
        actorId: input.actorId ?? null,
        actorName: input.actorName,
        action: input.action,
        entityType: input.entityType,
        entityLabel: input.entityLabel,
        href: input.href ?? null,
      },
    });
  } catch (error) {
    console.error('Failed to log activity', error);
  }
}

export function getRecentActivity(limit = 8) {
  try {
    return prisma.activityLog.findMany({ orderBy: { createdAt: 'desc' }, take: limit });
  } catch (error) {
    console.error('getRecentActivity failed, returning empty list', error);
    return [];
  }
}

export function getLatestActivity() {
  try {
    return prisma.activityLog.findFirst({ orderBy: { createdAt: 'desc' } });
  } catch (error) {
    console.error('getLatestActivity failed, returning null', error);
    return null;
  }
}

export async function getActivityCountsSince(since: Date) {
  const grouped = await prisma.activityLog.groupBy({
    by: ['entityType'],
    where: { createdAt: { gte: since } },
    _count: { _all: true },
  });

  return grouped
    .map((row) => ({ entityType: row.entityType, count: row._count._all }))
    .sort((a, b) => b.count - a.count);
}

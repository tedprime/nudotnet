import Link from 'next/link';
import Image from 'next/image';
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Newspaper,
  Link2,
  ArrowUpRight,
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { getRecentActivity, getActivityCountsSince, getLatestActivity } from '@/lib/activity';
import { getAttentionItems } from '@/lib/admin/attention';
import { relativeTime } from '@/lib/admin/relative-time';
import { ContentPulse } from '@/components/admin/content-pulse';
import { ActivityAction } from '@/generated/prisma/enums';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

const ACTION_VERB: Record<ActivityAction, string> = {
  [ActivityAction.CREATED]: 'created',
  [ActivityAction.UPDATED]: 'updated',
  [ActivityAction.DELETED]: 'deleted',
};

export default async function AdminDashboardPage() {
  const session = await getSession();
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [
    staffCount,
    staffWithPhoto,
    projectCount,
    recentProjects,
    programCount,
    programs,
    eventCount,
    articleCount,
    activityCounts,
    recentActivity,
    latestActivity,
    attentionItems,
  ] = await Promise.all([
    prisma.staffMember.count(),
    prisma.staffMember.findMany({
      where: { photoUrl: { not: null } },
      orderBy: { createdAt: 'desc' },
      take: 6,
      select: { id: true, fullName: true, photoUrl: true },
    }),
    prisma.project.count(),
    prisma.project.findMany({
      where: { imageUrl: { not: null } },
      orderBy: { order: 'asc' },
      take: 3,
      select: { id: true, name: true, imageUrl: true },
    }),
    prisma.program.count(),
    prisma.program.findMany({ orderBy: { order: 'asc' }, select: { id: true, name: true } }),
    prisma.event.count(),
    prisma.event.count({ where: { slug: { not: null } } }),
    getActivityCountsSince(since),
    getRecentActivity(8),
    getLatestActivity(),
    getAttentionItems(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-black">
            {greeting()}
            {session?.name ? `, ${session.name.split(' ')[0]}` : ''}
          </h1>
          <p className="mt-1 text-sm text-black/50">
            {latestActivity
              ? `Last updated ${relativeTime(latestActivity.createdAt)}`
              : 'No content changes yet'}
          </p>
        </div>
        <a
          href={SITE_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-medium text-black/70 shadow-sm hover:bg-black/5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          Website Live
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ContentPulse rows={activityCounts.map((r) => ({ entityType: r.entityType, count: r.count }))} />

        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-sm font-semibold text-black">Attention Required</h2>
          <p className="text-xs text-black/50">Content that needs a follow-up</p>

          {attentionItems.length === 0 ? (
            <div className="mt-6 flex items-center gap-2 text-sm text-black/50">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              All caught up — nothing needs attention right now.
            </div>
          ) : (
            <ul className="mt-4 space-y-1">
              {attentionItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm text-black/80 hover:bg-black/5"
                  >
                    <span className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />
                      {item.label}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-black/30" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Link
          href="/admin/staff"
          className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <p className="text-2xl font-bold text-black">{staffCount}</p>
          <p className="text-sm font-medium text-black/60">Staff Members</p>
          {staffWithPhoto.length > 0 && (
            <div className="mt-4 flex -space-x-3">
              {staffWithPhoto.map((s) => (
                <Image
                  key={s.id}
                  src={s.photoUrl!}
                  alt={s.fullName}
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full border-2 border-white object-cover"
                />
              ))}
              {staffCount > staffWithPhoto.length && (
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-black/5 text-[11px] font-semibold text-black/60">
                  +{staffCount - staffWithPhoto.length}
                </span>
              )}
            </div>
          )}
        </Link>

        <Link
          href="/admin/projects"
          className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <p className="text-2xl font-bold text-black">{projectCount}</p>
          <p className="text-sm font-medium text-black/60">Projects</p>
          {recentProjects.length > 0 && (
            <div className="mt-4 flex gap-2">
              {recentProjects.map((p) => (
                <Image
                  key={p.id}
                  src={p.imageUrl!}
                  alt={p.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-lg object-cover"
                />
              ))}
            </div>
          )}
        </Link>

        <Link
          href="/admin/programs"
          className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <p className="text-2xl font-bold text-black">{programCount}</p>
          <p className="text-sm font-medium text-black/60">Programs</p>
          {programs.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {programs.map((p) => (
                <span
                  key={p.id}
                  className="rounded-full bg-[#ef6e11]/10 px-2.5 py-1 text-[11px] font-medium text-[#ef6e11]"
                >
                  {p.name}
                </span>
              ))}
            </div>
          )}
        </Link>

        <Link
          href="/admin/events"
          className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <p className="text-2xl font-bold text-black">{eventCount}</p>
          <p className="text-sm font-medium text-black/60">Events &amp; News</p>
          <div className="mt-4 space-y-1.5 text-xs text-black/50">
            <div className="flex items-center gap-1.5">
              <Newspaper className="h-3.5 w-3.5" />
              {articleCount} full article{articleCount === 1 ? '' : 's'}
            </div>
            <div className="flex items-center gap-1.5">
              <Link2 className="h-3.5 w-3.5" />
              {eventCount - articleCount} external link{eventCount - articleCount === 1 ? '' : 's'}
            </div>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-sm font-semibold text-black">Recent Activity</h2>

          {recentActivity.length === 0 ? (
            <p className="mt-6 text-sm text-black/40">Nothing logged yet.</p>
          ) : (
            <ul className="mt-4 divide-y divide-black/5">
              {recentActivity.map((entry) => {
                const row = (
                  <div className="flex items-center justify-between gap-3 py-3">
                    <p className="text-sm text-black/80">
                      <span className="font-medium text-black">{entry.actorName}</span>{' '}
                      {ACTION_VERB[entry.action]} {entry.entityType.toLowerCase()}{' '}
                      <span className="font-medium text-black">{entry.entityLabel}</span>
                    </p>
                    <span className="shrink-0 text-xs text-black/40">
                      {relativeTime(entry.createdAt)}
                    </span>
                  </div>
                );
                return (
                  <li key={entry.id}>
                    {entry.href ? (
                      <Link href={entry.href} className="block rounded-lg hover:bg-black/5">
                        {row}
                      </Link>
                    ) : (
                      row
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-2 shadow-sm">
          <div className="flex items-center justify-between px-4 pt-3 pb-2">
            <h2 className="text-sm font-semibold text-black">Live Website</h2>
            <a
              href={SITE_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-xs font-medium text-[#ef6e11] hover:underline"
            >
              Open <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div className="overflow-hidden rounded-xl border border-black/10">
            <iframe
              src={SITE_URL}
              title="Live website preview"
              className="h-64 w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

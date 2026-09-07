'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  ShieldCheck,
  CalendarDays,
  GraduationCap,
  Sparkles,
  Globe2,
  Layers,
  Handshake,
  Type,
  GalleryHorizontal,
  PlayCircle,
} from 'lucide-react';
import { Role } from '@/generated/prisma/enums';
import type { SessionPayload } from '@/lib/session';

const NAV_GROUPS = [
  {
    title: null,
    items: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
      { href: '/admin/staff', label: 'Staff', icon: Users, exact: false },
      { href: '/admin/projects', label: 'Projects', icon: Briefcase, exact: false },
      { href: '/admin/programs', label: 'Programs', icon: GraduationCap, exact: false },
    ],
  },
  {
    title: 'Home Page',
    items: [
      { href: '/admin/sections', label: 'Section Intros', icon: Type, exact: false },
      { href: '/admin/about-gallery', label: 'About Gallery', icon: GalleryHorizontal, exact: false },
      {
        href: '/admin/training-highlights',
        label: 'Training Highlights',
        icon: PlayCircle,
        exact: false,
      },
      { href: '/admin/partnerships', label: 'Partnerships', icon: Handshake, exact: false },
    ],
  },
  {
    title: 'Content',
    items: [
      { href: '/admin/capabilities', label: 'Capabilities', icon: Sparkles, exact: false },
      { href: '/admin/industries', label: 'Industries', icon: Layers, exact: false },
      { href: '/admin/hero', label: 'Page Heroes', icon: Globe2, exact: false },
      { href: '/admin/events', label: 'Events & News', icon: CalendarDays, exact: false },
    ],
  },
] as const;

export const AdminSidebar = ({
  session,
  mobile = false,
}: {
  session: SessionPayload;
  mobile?: boolean;
}) => {
  const pathname = usePathname();

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside
      className={`flex ${mobile ? 'h-full' : 'h-screen'} w-64 shrink-0 flex-col border-r border-black/10 bg-white`}
    >
      <div className="flex h-20 shrink-0 items-center border-b border-black/10 px-6">
        <span className="text-lg font-bold text-black">
          TedPrime <span className="text-[#ef6e11]">Admin</span>
        </span>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto p-4">
        {NAV_GROUPS.map((group) => (
          <div key={group.title ?? 'main'} className="space-y-1">
            {group.title && (
              <p className="px-3 text-xs font-semibold uppercase tracking-wide text-black/40">
                {group.title}
              </p>
            )}
            {group.items.map(({ href, label, icon: Icon, exact }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(href, exact)
                    ? 'bg-[#ef6e11]/10 text-[#ef6e11]'
                    : 'text-black/70 hover:bg-black/5'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </div>
        ))}

        {session.role === Role.SUPER_ADMIN && (
          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold uppercase tracking-wide text-black/40">
              Admin
            </p>
            <Link
              href="/admin/users"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/admin/users', false)
                  ? 'bg-[#ef6e11]/10 text-[#ef6e11]'
                  : 'text-black/70 hover:bg-black/5'
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              Admin Users
            </Link>
          </div>
        )}
      </nav>

      <div className="shrink-0 border-t border-black/10 p-4">
        <p className="truncate text-sm font-medium text-black">{session.name}</p>
        <p className="truncate text-xs text-black/50">{session.email}</p>
      </div>
    </aside>
  );
};

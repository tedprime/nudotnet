'use client';

import { relativeTime } from '@/lib/admin/relative-time';
import { AdminSearch } from '@/components/admin/search';
import { TopbarActions } from '@/components/admin/topbar-actions';
import MobileDrawer from '@/components/admin/mobile-drawer';
import { MobileNavProvider, useMobileNav } from '@/components/admin/mobile-nav-context';
import type { SessionPayload } from '@/lib/session';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export function AdminTopbar({
  session,
  attentionItems,
  latestActivity,
}: {
  session: SessionPayload;
  attentionItems: { id: string; label: string; href: string }[];
  latestActivity: { createdAt: Date } | null;
}) {
  const lastUpdateLabel = latestActivity
    ? `Last content update ${relativeTime(latestActivity.createdAt)}`
    : 'No content changes yet';

  return (
    <MobileNavProvider>
      <HeaderContent
        session={session}
        attentionItems={attentionItems}
        lastUpdateLabel={lastUpdateLabel}
      />
      <MobileDrawer session={session} />
    </MobileNavProvider>
  );
}

function HeaderContent({
  session,
  attentionItems,
  lastUpdateLabel,
}: {
  session: SessionPayload;
  attentionItems: { id: string; label: string; href: string }[];
  lastUpdateLabel: string;
}) {
  const mobileNav = useMobileNav();

  return (
    <header className="border-b border-black/10 bg-white px-3 py-2 sm:h-20 sm:px-6">
      <div className="hidden sm:flex sm:items-center sm:gap-4">
        <div className="w-full sm:max-w-md">
          <AdminSearch />
        </div>

        <div className="ml-auto sm:w-auto">
          <TopbarActions
            siteUrl={SITE_URL}
            lastUpdateLabel={lastUpdateLabel}
            attentionItems={attentionItems}
            userName={session.name}
            userEmail={session.email}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:hidden">
        <button
          type="button"
          onClick={() => mobileNav.toggle()}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-black/60 hover:bg-black/5"
          aria-label="Open menu"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <div className="flex-1 min-w-0">
          <AdminSearch />
        </div>

        <TopbarActions
          siteUrl={SITE_URL}
          lastUpdateLabel={lastUpdateLabel}
          attentionItems={attentionItems}
          userName={session.name}
          userEmail={session.email}
          showMenuButton={false}
          showWebsite={false}
          showNotifications
          showAccount
          compact
        />
      </div>
    </header>
  );
}

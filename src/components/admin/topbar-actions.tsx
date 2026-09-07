'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { Globe2, Bell, ChevronDown, LogOut, AlertTriangle, ExternalLink } from 'lucide-react';
import { logout } from '@/app/admin/(protected)/actions';
import { Button } from '@/components/ui/button';
import { useMobileNav } from '@/components/admin/mobile-nav-context';

type AttentionItem = { id: string; label: string; href: string };

type Props = {
  siteUrl: string;
  lastUpdateLabel: string;
  attentionItems: AttentionItem[];
  userName: string;
  userEmail: string;
  showMenuButton?: boolean;
  showWebsite?: boolean;
  showNotifications?: boolean;
  showAccount?: boolean;
  compact?: boolean;
};

type Menu = 'website' | 'notifications' | 'account';

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function TopbarActions({
  siteUrl,
  lastUpdateLabel,
  attentionItems,
  userName,
  userEmail,
  showMenuButton = false,
  showWebsite = true,
  showNotifications = true,
  showAccount = true,
  compact = false,
}: Props) {
  const [openMenu, setOpenMenu] = useState<Menu | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileNav = useMobileNav();

  useEffect(() => {
    if (!openMenu) return;
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenu]);

  const toggle = (menu: Menu) => setOpenMenu((current) => (current === menu ? null : menu));

  return (
    <div ref={containerRef} className={`flex items-center ${compact ? 'justify-end' : 'justify-start'} gap-1.5 sm:gap-2`}>
      {showMenuButton && (
        <button
          type="button"
          onClick={() => mobileNav.toggle()}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-medium text-black/60 hover:bg-black/5 lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>
      )}
      {showWebsite && (
        <div className="relative">
          <button
            type="button"
            onClick={() => toggle('website')}
            className="flex items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-medium text-black/60 hover:bg-black/5 sm:px-3"
          >
            <Globe2 className="h-4 w-4" />
            <span className="hidden sm:inline">Website</span>
          </button>

          {openMenu === 'website' && (
            <div className="absolute right-0 top-full z-30 mt-2 w-64 rounded-xl border border-black/10 bg-white p-4 shadow-lg">
              <a
                href={siteUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between text-sm font-medium text-black hover:text-[#ef6e11]"
              >
                Visit Website <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <p className="mt-2 text-xs text-black/50">{lastUpdateLabel}</p>
            </div>
          )}
        </div>
      )}

      {showNotifications && (
        <div className="relative">
          <button
            type="button"
            onClick={() => toggle('notifications')}
            className="relative flex items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-medium text-black/60 hover:bg-black/5 sm:px-3"
          >
            <Bell className="h-4 w-4" />
            {attentionItems.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#ef6e11] text-[10px] font-semibold text-white">
                {attentionItems.length}
              </span>
            )}
          </button>

          {openMenu === 'notifications' && (
            <div className="absolute right-0 top-full z-30 mt-2 w-80 rounded-xl border border-black/10 bg-white p-2 shadow-lg">
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-black/40">
                Needs attention
              </p>
              {attentionItems.length === 0 ? (
                <p className="px-3 pb-2 text-sm text-black/40">All caught up.</p>
              ) : (
                <ul className="max-h-72 overflow-y-auto">
                  {attentionItems.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        onClick={() => setOpenMenu(null)}
                        className="flex items-start gap-2 rounded-lg px-3 py-2 text-sm text-black/80 hover:bg-black/5"
                      >
                        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}

      {showAccount && (
        <div className="relative">
          <button
            type="button"
            onClick={() => toggle('account')}
            className="flex items-center gap-1.5 rounded-lg px-1.5 py-1.5 hover:bg-black/5 sm:gap-2 sm:px-2"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ef6e11]/10 text-xs font-semibold text-[#ef6e11]">
              {initials(userName)}
            </span>
            <ChevronDown className="hidden h-3.5 w-3.5 text-black/40 sm:inline-block" />
          </button>

          {openMenu === 'account' && (
            <div className="absolute right-0 top-full z-30 mt-2 w-56 rounded-xl border border-black/10 bg-white p-4 shadow-lg">
              <p className="truncate text-sm font-medium text-black">{userName}</p>
              <p className="truncate text-xs text-black/50">{userEmail}</p>
              <div className="mt-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full gap-2"
                  onClick={async () => {
                    await fetch('/api/admin/logout', { method: 'POST' });
                    window.location.href = '/admin/login';
                  }}
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sign out
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

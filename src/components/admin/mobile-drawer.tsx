"use client";

import React from 'react';
import { useMobileNav } from '@/components/admin/mobile-nav-context';
import { AdminSidebar } from '@/components/admin/sidebar';
import type { SessionPayload } from '@/lib/session';

export default function MobileDrawer({ session }: { session: SessionPayload }) {
  const { open, setOpen } = useMobileNav();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="fixed inset-0 bg-black/40"
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <aside className="relative h-full w-64 shrink-0 border-r border-black/10 bg-white">
        <div className="overflow-y-auto w-full">
          <AdminSidebar session={session} />
        </div>
      </aside>
    </div>
  );
}

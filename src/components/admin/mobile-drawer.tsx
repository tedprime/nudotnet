"use client";

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useMobileNav } from '@/components/admin/mobile-nav-context';
import { AdminSidebar } from '@/components/admin/sidebar';
import type { SessionPayload } from '@/lib/session';

export default function MobileDrawer({ session }: { session: SessionPayload }) {
  const pathname = usePathname();
  const { open, close } = useMobileNav();

  useEffect(() => {
    close();
  }, [pathname, close]);

  return (
    <div
      className={`fixed inset-0 z-50 flex transition-opacity duration-200 ${
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!open}
    >
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-200 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={close}
        aria-hidden
      />
      <div
        className={`relative z-10 h-full w-64 shrink-0 overflow-hidden bg-white shadow-xl transition-transform duration-200 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <AdminSidebar session={session} mobile onNavigate={close} />
      </div>
    </div>
  );
}

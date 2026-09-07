'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function ProgramNav({ programId }: { programId: string }) {
  const pathname = usePathname();
  const base = `/admin/programs/${programId}`;

  const items = [
    { href: base, label: 'Details', exact: true },
    { href: `${base}/writeups`, label: 'Write-Ups', exact: false },
    { href: `${base}/gallery`, label: 'Gallery', exact: false },
    { href: `${base}/sessions`, label: 'Sessions', exact: false },
  ];

  return (
    <div className="mt-4 flex flex-wrap gap-2 border-b border-black/10 pb-4">
      {items.map(({ href, label, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              active ? 'bg-[#ef6e11] text-white' : 'bg-black/5 text-black/70 hover:bg-black/10'
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}

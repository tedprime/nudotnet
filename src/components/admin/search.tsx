'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Search as SearchIcon, Loader2 } from 'lucide-react';
import { searchAdminContent, type SearchResult } from '@/app/admin/(protected)/search-actions';

export function AdminSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }
      startTransition(async () => {
        const found = await searchAdminContent(query);
        setResults(found);
      });
    }, 250);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="flex items-center gap-2 rounded-lg border border-black/10 bg-black/[0.03] px-3 py-2">
        <SearchIcon className="h-4 w-4 shrink-0 text-black/40" />
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search staff, projects, programs, events…"
          className="w-full bg-transparent text-sm text-black outline-none placeholder:text-black/40"
        />
        {isPending && <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-black/30" />}
      </div>

      {open && query.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-80 overflow-y-auto rounded-xl border border-black/10 bg-white py-2 shadow-lg">
          {results.length === 0 && !isPending ? (
            <p className="px-4 py-3 text-sm text-black/40">No matches found.</p>
          ) : (
            results.map((result) => (
              <button
                key={result.id}
                type="button"
                onClick={() => {
                  setOpen(false);
                  setQuery('');
                  router.push(result.href);
                }}
                className="flex w-full flex-col items-start px-4 py-2 text-left hover:bg-black/5"
              >
                <span className="text-sm font-medium text-black">{result.label}</span>
                <span className="text-xs text-black/50">{result.sublabel}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

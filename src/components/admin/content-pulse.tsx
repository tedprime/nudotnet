type PulseRow = { entityType: string; count: number };

export function ContentPulse({ rows }: { rows: PulseRow[] }) {
  const max = Math.max(1, ...rows.map((r) => r.count));

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-semibold text-black">Content Pulse</h2>
      <p className="text-xs text-black/50">Activity in the last 7 days</p>

      {rows.length === 0 ? (
        <p className="mt-8 text-sm text-black/40">No activity yet this week.</p>
      ) : (
        <ul className="mt-5 space-y-3">
          {rows.map((row) => (
            <li key={row.entityType} className="flex items-center gap-3">
              <span className="w-32 shrink-0 truncate text-xs font-medium text-black/60">
                {row.entityType}
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/5">
                <div
                  className="h-full rounded-full bg-[#ef6e11]"
                  style={{ width: `${Math.max(6, (row.count / max) * 100)}%` }}
                />
              </div>
              <span className="w-5 shrink-0 text-right text-xs font-semibold tabular-nums text-black">
                {row.count}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

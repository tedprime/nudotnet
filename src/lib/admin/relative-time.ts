export function relativeTime(date: Date | string): string {
  const value = date instanceof Date ? date : new Date(date);
  const diffSec = Math.round((Date.now() - value.getTime()) / 1000);
  if (diffSec < 60) return 'just now';

  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;

  const diffHour = Math.round(diffMin / 60);
  if (diffHour < 24) return `${diffHour}h ago`;

  const diffDay = Math.round(diffHour / 24);
  if (diffDay < 7) return `${diffDay}d ago`;

  const diffWeek = Math.round(diffDay / 7);
  if (diffWeek < 5) return `${diffWeek}w ago`;

  const diffMonth = Math.round(diffDay / 30);
  return `${diffMonth}mo ago`;
}

'use client';

import { useTransition } from 'react';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { deleteCapability } from './actions';

export function DeleteCapabilityButton({ id, title }: { id: string; title: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
        startTransition(async () => {
          await deleteCapability(id);
          toast.success('Capability deleted');
        });
      }}
      className="inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:underline disabled:opacity-50"
    >
      <Trash2 className="h-3.5 w-3.5" />
      Delete
    </button>
  );
}

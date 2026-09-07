'use client';

import { useTransition } from 'react';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { deleteAdminUser } from './actions';

export function DeleteAdminUserButton({ id, name }: { id: string; name: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (!confirm(`Remove ${name}'s admin access?`)) return;
        startTransition(async () => {
          const result = await deleteAdminUser(id);
          if (result?.error) {
            toast.error(result.error);
            return;
          }
          toast.success('Admin account removed');
        });
      }}
      className="inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:underline disabled:opacity-50"
    >
      <Trash2 className="h-3.5 w-3.5" />
      Remove
    </button>
  );
}

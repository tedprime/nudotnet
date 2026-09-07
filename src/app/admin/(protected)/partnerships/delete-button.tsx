'use client';

import { useTransition } from 'react';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { deletePartnerLogo } from './actions';

export function DeletePartnerLogoButton({ id, alt }: { id: string; alt: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (!confirm(`Delete the "${alt}" logo?`)) return;
        startTransition(async () => {
          await deletePartnerLogo(id);
          toast.success('Logo deleted');
        });
      }}
      className="inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:underline disabled:opacity-50"
    >
      <Trash2 className="h-3.5 w-3.5" />
      Delete
    </button>
  );
}

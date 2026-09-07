'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { deleteProgram } from './actions';

export function DeleteProgramButton({
  id,
  name,
  redirectTo,
}: {
  id: string;
  name: string;
  redirectTo?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (
          !confirm(
            `Delete "${name}"? This also deletes all of its write-ups, gallery images, and sessions. This cannot be undone.`
          )
        )
          return;
        startTransition(async () => {
          await deleteProgram(id);
          toast.success('Program deleted');
          if (redirectTo) router.push(redirectTo);
        });
      }}
      className="inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:underline disabled:opacity-50"
    >
      <Trash2 className="h-3.5 w-3.5" />
      Delete
    </button>
  );
}

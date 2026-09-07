'use client';

import { useTransition } from 'react';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { deleteTrainingSession } from './actions';

export function DeleteSessionButton({
  programId,
  sessionId,
  name,
}: {
  programId: string;
  sessionId: string;
  name: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
        startTransition(async () => {
          await deleteTrainingSession(programId, sessionId);
          toast.success('Session deleted');
        });
      }}
      className="inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:underline disabled:opacity-50"
    >
      <Trash2 className="h-3.5 w-3.5" />
      Delete
    </button>
  );
}

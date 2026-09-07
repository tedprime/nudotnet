'use client';

import { useTransition } from 'react';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { deleteGalleryImage } from './actions';

export function DeleteGalleryImageButton({
  programId,
  imageId,
}: {
  programId: string;
  imageId: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (!confirm('Delete this image? This cannot be undone.')) return;
        startTransition(async () => {
          await deleteGalleryImage(programId, imageId);
          toast.success('Image deleted');
        });
      }}
      className="inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:underline disabled:opacity-50"
    >
      <Trash2 className="h-3.5 w-3.5" />
      Delete
    </button>
  );
}

'use client';

import { useRef, useTransition } from 'react';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { addWriteupImage, deleteWriteupImage } from './actions';

type WriteupImage = { id: string; imageUrl: string };

export function WriteupImages({
  programId,
  writeupId,
  images,
}: {
  programId: string;
  writeupId: string;
  images: WriteupImage[];
}) {
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="mt-6 max-w-2xl rounded-2xl border border-black/10 bg-white p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-black/50">
        Photos
      </h3>
      <p className="mt-1 text-xs text-black/50">
        One photo shows as a static image on the public page; two or more show as a
        carousel.
      </p>

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {images.map((image) => (
            <div key={image.id} className="group relative aspect-video overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={image.imageUrl}
                alt=""
                fill
                className="object-cover"
                unoptimized
              />
              <button
                type="button"
                disabled={isPending}
                onClick={() => {
                  if (!confirm('Delete this photo?')) return;
                  startTransition(async () => {
                    await deleteWriteupImage(programId, writeupId, image.id);
                    toast.success('Photo deleted');
                  });
                }}
                className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          disabled={isPending}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            const formData = new FormData();
            formData.set('photo', file);
            startTransition(async () => {
              const result = await addWriteupImage(programId, writeupId, formData);
              if (result?.error) {
                toast.error(result.error);
              } else {
                toast.success('Photo added');
              }
              if (fileInputRef.current) fileInputRef.current.value = '';
            });
          }}
          className="text-sm text-black/70"
        />
      </div>
    </div>
  );
}

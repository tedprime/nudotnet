'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition, type ReactNode } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import { galleryImageFormSchema, type GalleryImageFormValues } from './schema';
import { createGalleryImage, updateGalleryImage } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
  programId: string;
  imageId?: string;
  imageUrl?: string | null;
  defaultValues?: Partial<GalleryImageFormValues>;
};

const EMPTY_DEFAULTS: GalleryImageFormValues = { group: '', order: 0 };

export function GalleryForm({ programId, imageId, imageUrl, defaultValues }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [preview, setPreview] = useState<string | null>(imageUrl ?? null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GalleryImageFormValues>({
    resolver: zodResolver(galleryImageFormSchema),
    defaultValues: { ...EMPTY_DEFAULTS, ...defaultValues },
  });

  const backHref = `/admin/programs/${programId}/gallery`;

  const onSubmit = (values: GalleryImageFormValues) => {
    setServerError(null);
    if (!imageId && !photoFile) {
      setServerError('A photo is required.');
      return;
    }
    const formData = new FormData();
    formData.set('group', values.group ?? '');
    formData.set('order', String(values.order ?? 0));
    if (photoFile) formData.set('photo', photoFile);

    startTransition(async () => {
      const result = imageId
        ? await updateGalleryImage(programId, imageId, formData)
        : await createGalleryImage(programId, formData);

      if (result?.error) {
        setServerError(result.error);
        toast.error(result.error);
        return;
      }

      toast.success(imageId ? 'Image updated' : 'Image added');
      router.push(backHref);
      router.refresh();
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 max-w-xl space-y-6 rounded-2xl border border-black/10 bg-white p-6"
    >
      <div className="space-y-1.5">
        <Label>Photo</Label>
        <div className="flex items-center gap-4">
          <div className="h-20 w-32 shrink-0 overflow-hidden rounded-lg bg-gray-100">
            {preview && (
              <Image
                src={preview}
                alt="Preview"
                width={128}
                height={80}
                className="h-full w-full object-cover"
                unoptimized
              />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              setPhotoFile(file);
              setPreview(URL.createObjectURL(file));
            }}
            className="text-sm text-black/70"
          />
        </div>
      </div>

      <Field
        label="Group (optional — leave blank for one flat gallery)"
        error={errors.group?.message}
      >
        <Input {...register('group')} placeholder="Baseline" />
      </Field>
      <Field label="Sort Order" error={errors.order?.message}>
        <Input type="number" {...register('order', { valueAsNumber: true })} />
      </Field>

      {serverError && <p className="text-sm text-red-600">{serverError}</p>}

      <div className="flex items-center gap-3">
        <Button
          type="submit"
          disabled={isPending}
          className="bg-[#ef6e11] hover:bg-[#ef6e11]/90"
        >
          {isPending ? 'Saving…' : imageId ? 'Save Changes' : 'Add Image'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push(backHref)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

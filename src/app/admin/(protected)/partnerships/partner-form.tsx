'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition, type ReactNode } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import { partnerLogoFormSchema, type PartnerLogoFormValues } from './schema';
import { createPartnerLogo, updatePartnerLogo } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
  logoId?: string;
  imageUrl?: string | null;
  defaultValues?: Partial<PartnerLogoFormValues>;
};

const EMPTY_DEFAULTS: PartnerLogoFormValues = { alt: '', order: 0 };

export function PartnerForm({ logoId, imageUrl, defaultValues }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [preview, setPreview] = useState<string | null>(imageUrl ?? null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PartnerLogoFormValues>({
    resolver: zodResolver(partnerLogoFormSchema),
    defaultValues: { ...EMPTY_DEFAULTS, ...defaultValues },
  });

  const onSubmit = (values: PartnerLogoFormValues) => {
    setServerError(null);
    if (!logoId && !photoFile) {
      setServerError('A logo image is required.');
      return;
    }
    const formData = new FormData();
    formData.set('alt', values.alt);
    formData.set('order', String(values.order ?? 0));
    if (photoFile) formData.set('photo', photoFile);

    startTransition(async () => {
      const result = logoId
        ? await updatePartnerLogo(logoId, formData)
        : await createPartnerLogo(formData);

      if (result?.error) {
        setServerError(result.error);
        toast.error(result.error);
        return;
      }

      toast.success(logoId ? 'Logo updated' : 'Logo added');
      router.push('/admin/partnerships');
      router.refresh();
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 max-w-xl space-y-6 rounded-2xl border border-black/10 bg-white p-6"
    >
      <div className="space-y-1.5">
        <Label>Logo</Label>
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
            {preview && (
              <Image
                src={preview}
                alt="Preview"
                width={100}
                height={70}
                className="h-full w-full object-contain"
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

      <Field label="Alt Text (partner name)" error={errors.alt?.message}>
        <Input {...register('alt')} placeholder="Microsoft" />
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
          {isPending ? 'Saving…' : logoId ? 'Save Changes' : 'Add Logo'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/partnerships')}
        >
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

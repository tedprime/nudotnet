'use client';

import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition, type ReactNode } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import { pageHeroFormSchema, type PageHeroFormValues, HERO_PAGE_LABELS } from './schema';
import { createPageHero, updatePageHero } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  heroId?: string;
  image?: string | null;
  defaultValues?: Partial<PageHeroFormValues>;
};

const EMPTY_DEFAULTS: PageHeroFormValues = {
  page: 'HOME',
  order: 0,
  eyebrow: '',
  body: '',
  bgColor: '',
  ctaLabel: '',
  ctaHref: '',
  ctaExternal: false,
};

export function HeroForm({ heroId, image, defaultValues }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [preview, setPreview] = useState<string | null>(image ?? null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<PageHeroFormValues>({
    resolver: zodResolver(pageHeroFormSchema),
    defaultValues: { ...EMPTY_DEFAULTS, ...defaultValues },
  });

  const page = watch('page');
  const isHome = page === 'HOME';

  const onSubmit = (values: PageHeroFormValues) => {
    setServerError(null);
    if (!heroId && !imageFile) {
      setServerError('A photo is required.');
      return;
    }
    const formData = new FormData();
    formData.set('page', values.page);
    formData.set('order', String(values.order ?? 0));
    formData.set('eyebrow', values.eyebrow);
    formData.set('body', values.body);
    formData.set('bgColor', values.bgColor ?? '');
    formData.set('ctaLabel', values.ctaLabel ?? '');
    formData.set('ctaHref', values.ctaHref ?? '');
    if (values.ctaExternal) formData.set('ctaExternal', 'on');
    if (imageFile) formData.set('image', imageFile);

    startTransition(async () => {
      const result = heroId
        ? await updatePageHero(heroId, formData)
        : await createPageHero(formData);

      if (result?.error) {
        setServerError(result.error);
        toast.error(result.error);
        return;
      }

      toast.success(heroId ? 'Hero updated' : 'Hero created');
      router.push('/admin/hero');
      router.refresh();
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 max-w-2xl space-y-6 rounded-2xl border border-black/10 bg-white p-6"
    >
      <div className="space-y-1.5">
        <Label>Background Image</Label>
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
              setImageFile(file);
              setPreview(URL.createObjectURL(file));
            }}
            className="text-sm text-black/70"
          />
        </div>
      </div>

      <Field label="Page">
        <Controller
          control={control}
          name="page"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(HERO_PAGE_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {isHome && (
          <p className="text-xs text-black/50">
            Home has multiple slides — use Sort Order to control the sequence.
          </p>
        )}
      </Field>

      {isHome && (
        <Field label="Sort Order" error={errors.order?.message}>
          <Input type="number" {...register('order', { valueAsNumber: true })} />
        </Field>
      )}

      <Field label="Eyebrow" error={errors.eyebrow?.message}>
        <Input {...register('eyebrow')} placeholder="Solutions" />
      </Field>
      <Field label="Body" error={errors.body?.message}>
        <Textarea rows={3} {...register('body')} />
      </Field>

      {isHome && (
        <>
          <Field label="Background Tint (hex, optional)" error={errors.bgColor?.message}>
            <Input {...register('bgColor')} placeholder="#1e90ff" />
          </Field>
          <Field label="CTA Label" error={errors.ctaLabel?.message}>
            <Input {...register('ctaLabel')} placeholder="View Businesses" />
          </Field>
          <Field label="CTA Link" error={errors.ctaHref?.message}>
            <Input {...register('ctaHref')} placeholder="/about" />
          </Field>
          <label className="flex items-center gap-2 text-sm text-black/70">
            <input type="checkbox" {...register('ctaExternal')} className="h-4 w-4" />
            Open link in a new tab
          </label>
        </>
      )}

      {serverError && <p className="text-sm text-red-600">{serverError}</p>}

      <div className="flex items-center gap-3">
        <Button
          type="submit"
          disabled={isPending}
          className="bg-[#ef6e11] hover:bg-[#ef6e11]/90"
        >
          {isPending ? 'Saving…' : heroId ? 'Save Changes' : 'Create Hero'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/hero')}>
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

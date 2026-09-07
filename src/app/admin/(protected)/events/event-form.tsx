'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition, type ReactNode } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import { eventFormSchema, type EventFormValues } from './schema';
import { createEvent, updateEvent } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Props = {
  eventId?: string;
  imageUrl?: string | null;
  defaultValues?: Partial<EventFormValues>;
};

const EMPTY_DEFAULTS: EventFormValues = {
  date: '',
  headline: '',
  description: '',
  order: 0,
  hasArticle: false,
  slug: '',
  body: '',
  link: '',
  external: true,
};

export function EventForm({ eventId, imageUrl, defaultValues }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [preview, setPreview] = useState<string | null>(imageUrl ?? null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: { ...EMPTY_DEFAULTS, ...defaultValues },
  });

  const hasArticle = watch('hasArticle');

  const onSubmit = (values: EventFormValues) => {
    setServerError(null);
    const formData = new FormData();
    formData.set('date', values.date);
    formData.set('headline', values.headline);
    formData.set('description', values.description);
    formData.set('order', String(values.order ?? 0));
    formData.set('slug', values.slug ?? '');
    formData.set('body', values.body ?? '');
    formData.set('link', values.link ?? '');
    if (values.hasArticle) formData.set('hasArticle', 'on');
    if (values.external) formData.set('external', 'on');
    if (imageFile) formData.set('image', imageFile);

    startTransition(async () => {
      const result = eventId
        ? await updateEvent(eventId, formData)
        : await createEvent(formData);

      if (result?.error) {
        setServerError(result.error);
        toast.error(result.error);
        return;
      }

      toast.success(eventId ? 'Saved' : 'Created');
      router.push('/admin/events');
      router.refresh();
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 w-full max-w-2xl min-w-0 space-y-6 overflow-x-hidden rounded-2xl border border-black/10 bg-white p-6"
    >
      <div className="space-y-1.5">
        <Label>Photo (optional — used in the home slider)</Label>
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

      <Field label='Date (as displayed, e.g. "March 2026")' error={errors.date?.message}>
        <Input {...register('date')} />
      </Field>
      <Field label="Headline (short, used in the slider)" error={errors.headline?.message}>
        <Input {...register('headline')} />
      </Field>
      <Field label="Description (longer, used in the list)" error={errors.description?.message}>
        <Textarea rows={3} {...register('description')} />
      </Field>
      <Field label="Sort Order" error={errors.order?.message}>
        <Input type="number" {...register('order', { valueAsNumber: true })} />
      </Field>

      <label className="flex items-center gap-2 text-sm text-black/70">
        <input type="checkbox" {...register('hasArticle')} className="h-4 w-4" />
        This has its own article page on our site
      </label>

      {hasArticle ? (
        <>
          <Field label="Article Slug (used in the URL: /News/&lt;slug&gt;)" error={errors.slug?.message}>
            <Input {...register('slug')} placeholder="bac" />
          </Field>
          <Field
            label="Article Body (separate paragraphs with a blank line)"
            error={errors.body?.message}
          >
            <Textarea rows={12} {...register('body')} />
          </Field>
        </>
      ) : (
        <>
          <Field label="Link" error={errors.link?.message}>
            <Input {...register('link')} placeholder="https://..." />
          </Field>
          <label className="flex items-center gap-2 text-sm text-black/70">
            <input type="checkbox" {...register('external')} className="h-4 w-4" />
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
          {isPending ? 'Saving…' : eventId ? 'Save Changes' : 'Create'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/events')}>
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
    <div className="min-w-0 space-y-1.5 overflow-hidden">
      <Label className="block break-words leading-snug">{label}</Label>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition, type ReactNode } from 'react';
import { toast } from 'sonner';
import { sectionIntroFormSchema, type SectionIntroFormValues } from './schema';
import { updateSectionIntro } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Props = {
  sectionId: string;
  hasHeading: boolean;
  hasSecondaryBody: boolean;
  defaultValues: SectionIntroFormValues;
};

export function SectionForm({
  sectionId,
  hasHeading,
  hasSecondaryBody,
  defaultValues,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SectionIntroFormValues>({
    resolver: zodResolver(sectionIntroFormSchema),
    defaultValues,
  });

  const onSubmit = (values: SectionIntroFormValues) => {
    setServerError(null);
    const formData = new FormData();
    formData.set('eyebrow', values.eyebrow);
    formData.set('heading', values.heading ?? '');
    formData.set('body', values.body);
    formData.set('secondaryBody', values.secondaryBody ?? '');

    startTransition(async () => {
      const result = await updateSectionIntro(sectionId, formData);
      if (result?.error) {
        setServerError(result.error);
        toast.error(result.error);
        return;
      }
      toast.success('Saved');
      router.push('/admin/sections');
      router.refresh();
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 max-w-2xl space-y-6 rounded-2xl border border-black/10 bg-white p-6"
    >
      <Field label="Eyebrow" error={errors.eyebrow?.message}>
        <Input {...register('eyebrow')} />
      </Field>
      {hasHeading && (
        <Field label="Heading" error={errors.heading?.message}>
          <Input {...register('heading')} />
        </Field>
      )}
      <Field
        label={hasSecondaryBody ? 'Body (shown before the carousel)' : 'Body'}
        error={errors.body?.message}
      >
        <Textarea rows={4} {...register('body')} />
      </Field>
      {hasSecondaryBody && (
        <Field
          label="Body (shown after the carousel — separate paragraphs with a blank line)"
          error={errors.secondaryBody?.message}
        >
          <Textarea rows={4} {...register('secondaryBody')} />
        </Field>
      )}

      {serverError && <p className="text-sm text-red-600">{serverError}</p>}

      <div className="flex items-center gap-3">
        <Button
          type="submit"
          disabled={isPending}
          className="bg-[#ef6e11] hover:bg-[#ef6e11]/90"
        >
          {isPending ? 'Saving…' : 'Save Changes'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/sections')}>
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

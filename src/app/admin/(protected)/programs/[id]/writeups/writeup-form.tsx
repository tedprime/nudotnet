'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition, type ReactNode } from 'react';
import { toast } from 'sonner';
import { writeupFormSchema, type WriteupFormValues } from './schema';
import { createWriteup, updateWriteup } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Props = {
  programId: string;
  writeupId?: string;
  defaultValues?: Partial<WriteupFormValues>;
};

const EMPTY_DEFAULTS: WriteupFormValues = { title: '', body: '', order: 0 };

export function WriteupForm({ programId, writeupId, defaultValues }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WriteupFormValues>({
    resolver: zodResolver(writeupFormSchema),
    defaultValues: { ...EMPTY_DEFAULTS, ...defaultValues },
  });

  const backHref = `/admin/programs/${programId}/writeups`;

  const onSubmit = (values: WriteupFormValues) => {
    setServerError(null);
    const formData = new FormData();
    formData.set('title', values.title);
    formData.set('body', values.body);
    formData.set('order', String(values.order ?? 0));

    startTransition(async () => {
      const result = writeupId
        ? await updateWriteup(programId, writeupId, formData)
        : await createWriteup(programId, formData);

      if (result?.error) {
        setServerError(result.error);
        toast.error(result.error);
        return;
      }

      toast.success(writeupId ? 'Write-up updated' : 'Write-up created');
      router.push(backHref);
      router.refresh();
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 max-w-2xl space-y-6 rounded-2xl border border-black/10 bg-white p-6"
    >
      <Field label="Title" error={errors.title?.message}>
        <Input {...register('title')} />
      </Field>
      <Field label="Body" error={errors.body?.message}>
        <Textarea rows={6} {...register('body')} />
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
          {isPending ? 'Saving…' : writeupId ? 'Save Changes' : 'Create Write-Up'}
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

'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition, type ReactNode } from 'react';
import { toast } from 'sonner';
import { programFormSchema, type ProgramFormValues } from './schema';
import { createProgram, updateProgram } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
  programId?: string;
  defaultValues?: Partial<ProgramFormValues>;
};

const EMPTY_DEFAULTS: ProgramFormValues = { name: '', slug: '', order: 0 };

export function ProgramForm({ programId, defaultValues }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProgramFormValues>({
    resolver: zodResolver(programFormSchema),
    defaultValues: { ...EMPTY_DEFAULTS, ...defaultValues },
  });

  const onSubmit = (values: ProgramFormValues) => {
    setServerError(null);
    const formData = new FormData();
    formData.set('name', values.name);
    formData.set('slug', values.slug);
    formData.set('order', String(values.order ?? 0));

    startTransition(async () => {
      const result = programId
        ? await updateProgram(programId, formData)
        : await createProgram(formData);

      if (result?.error) {
        setServerError(result.error);
        toast.error(result.error);
        return;
      }

      toast.success(programId ? 'Program updated' : 'Program created');
      router.push('/admin/programs');
      router.refresh();
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 max-w-xl space-y-6 rounded-2xl border border-black/10 bg-white p-6"
    >
      <Field label="Name (shown as the tab label)" error={errors.name?.message}>
        <Input {...register('name')} placeholder="AGILE" />
      </Field>
      <Field label="Slug" error={errors.slug?.message}>
        <Input {...register('slug')} placeholder="agile" />
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
          {isPending ? 'Saving…' : programId ? 'Save Changes' : 'Create Program'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/programs')}>
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

'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition, type ReactNode } from 'react';
import { toast } from 'sonner';
import { sessionFormSchema, type SessionFormValues } from './schema';
import { createTrainingSession, updateTrainingSession } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Props = {
  programId: string;
  sessionId?: string;
  defaultValues?: Partial<SessionFormValues>;
};

const EMPTY_DEFAULTS: SessionFormValues = { name: '', description: '', order: 0 };

export function SessionForm({ programId, sessionId, defaultValues }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SessionFormValues>({
    resolver: zodResolver(sessionFormSchema),
    defaultValues: { ...EMPTY_DEFAULTS, ...defaultValues },
  });

  const backHref = `/admin/programs/${programId}/sessions`;

  const onSubmit = (values: SessionFormValues) => {
    setServerError(null);
    const formData = new FormData();
    formData.set('name', values.name);
    formData.set('description', values.description);
    formData.set('order', String(values.order ?? 0));

    startTransition(async () => {
      const result = sessionId
        ? await updateTrainingSession(programId, sessionId, formData)
        : await createTrainingSession(programId, formData);

      if (result?.error) {
        setServerError(result.error);
        toast.error(result.error);
        return;
      }

      toast.success(sessionId ? 'Session updated' : 'Session created');
      router.push(backHref);
      router.refresh();
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 max-w-2xl space-y-6 rounded-2xl border border-black/10 bg-white p-6"
    >
      <Field label="Name" error={errors.name?.message}>
        <Input {...register('name')} placeholder="Day 1: ..." />
      </Field>
      <Field label="Description" error={errors.description?.message}>
        <Textarea rows={6} {...register('description')} />
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
          {isPending ? 'Saving…' : sessionId ? 'Save Changes' : 'Create Session'}
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

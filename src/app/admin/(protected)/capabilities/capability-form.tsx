'use client';

import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition, type ReactNode } from 'react';
import { toast } from 'sonner';
import { capabilityFormSchema, type CapabilityFormValues } from './schema';
import { createCapability, updateCapability } from './actions';
import { ICON_KEYS, getIcon } from '@/lib/icons';
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
  capabilityId?: string;
  defaultValues?: Partial<CapabilityFormValues>;
};

const EMPTY_DEFAULTS: CapabilityFormValues = {
  section: 'HOME',
  icon: ICON_KEYS[0],
  title: '',
  description: '',
  order: 0,
};

export function CapabilityForm({ capabilityId, defaultValues }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CapabilityFormValues>({
    resolver: zodResolver(capabilityFormSchema),
    defaultValues: { ...EMPTY_DEFAULTS, ...defaultValues },
  });

  const onSubmit = (values: CapabilityFormValues) => {
    setServerError(null);
    const formData = new FormData();
    formData.set('section', values.section);
    formData.set('icon', values.icon);
    formData.set('title', values.title);
    formData.set('description', values.description);
    formData.set('order', String(values.order ?? 0));

    startTransition(async () => {
      const result = capabilityId
        ? await updateCapability(capabilityId, formData)
        : await createCapability(formData);

      if (result?.error) {
        setServerError(result.error);
        toast.error(result.error);
        return;
      }

      toast.success(capabilityId ? 'Capability updated' : 'Capability created');
      router.push('/admin/capabilities');
      router.refresh();
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 max-w-2xl space-y-6 rounded-2xl border border-black/10 bg-white p-6"
    >
      <Field label="Shown On">
        <Controller
          control={control}
          name="section"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HOME">Home — &quot;What We Do&quot;</SelectItem>
                <SelectItem value="SOLUTIONS">Solutions — &quot;What We Build&quot;</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </Field>
      <Field label="Icon">
        <Controller
          control={control}
          name="icon"
          render={({ field }) => {
            const SelectedIcon = getIcon(field.value);
            return (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <SelectedIcon className="h-4 w-4" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {ICON_KEYS.map((key) => {
                    const OptionIcon = getIcon(key);
                    return (
                      <SelectItem key={key} value={key}>
                        <span className="flex items-center gap-2">
                          <OptionIcon className="h-4 w-4" /> {key}
                        </span>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            );
          }}
        />
      </Field>
      <Field label="Title" error={errors.title?.message}>
        <Input {...register('title')} />
      </Field>
      <Field label="Description" error={errors.description?.message}>
        <Textarea rows={3} {...register('description')} />
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
          {isPending ? 'Saving…' : capabilityId ? 'Save Changes' : 'Create Capability'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/capabilities')}
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

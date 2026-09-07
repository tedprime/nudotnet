'use client';

import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition, type ReactNode } from 'react';
import { toast } from 'sonner';
import { createAdminUserSchema, type CreateAdminUserValues } from './schema';
import { createAdminUser } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function UserForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateAdminUserValues>({
    resolver: zodResolver(createAdminUserSchema),
    defaultValues: { name: '', email: '', password: '', role: 'EDITOR' },
  });

  const onSubmit = (values: CreateAdminUserValues) => {
    setServerError(null);
    const formData = new FormData();
    formData.set('name', values.name);
    formData.set('email', values.email);
    formData.set('password', values.password);
    formData.set('role', values.role);

    startTransition(async () => {
      const result = await createAdminUser(formData);
      if (result?.error) {
        setServerError(result.error);
        toast.error(result.error);
        return;
      }
      toast.success('Admin account created');
      router.push('/admin/users');
      router.refresh();
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 max-w-md space-y-6 rounded-2xl border border-black/10 bg-white p-6"
    >
      <Field label="Name" error={errors.name?.message}>
        <Input {...register('name')} />
      </Field>
      <Field label="Email" error={errors.email?.message}>
        <Input type="email" {...register('email')} />
      </Field>
      <Field label="Password" error={errors.password?.message}>
        <Input type="password" {...register('password')} />
      </Field>
      <Field label="Role">
        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EDITOR">Editor</SelectItem>
                <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      {serverError && <p className="text-sm text-red-600">{serverError}</p>}

      <div className="flex items-center gap-3">
        <Button
          type="submit"
          disabled={isPending}
          className="bg-[#ef6e11] hover:bg-[#ef6e11]/90"
        >
          {isPending ? 'Saving…' : 'Create Admin'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/users')}>
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

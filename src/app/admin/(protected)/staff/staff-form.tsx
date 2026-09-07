'use client';

import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition, type ReactNode } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import { staffFormSchema, type StaffFormValues } from './schema';
import { createStaff, updateStaff } from './actions';
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
  staffId?: string;
  photoUrl?: string | null;
  defaultValues?: Partial<StaffFormValues>;
};

const EMPTY_DEFAULTS: StaffFormValues = {
  fullName: '',
  slug: '',
  staffId: '',
  title: '',
  department: '',
  location: '',
  employmentType: 'FULL_TIME',
  status: 'ACTIVE',
  startDate: '',
  bio: '',
  email: '',
  phone: '',
  featured: false,
};

export function StaffForm({ staffId, photoUrl, defaultValues }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [preview, setPreview] = useState<string | null>(photoUrl ?? null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<StaffFormValues>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: { ...EMPTY_DEFAULTS, ...defaultValues },
  });

  const onSubmit = (values: StaffFormValues) => {
    setServerError(null);
    const formData = new FormData();
    formData.set('fullName', values.fullName);
    formData.set('slug', values.slug);
    formData.set('staffId', values.staffId);
    formData.set('title', values.title);
    formData.set('department', values.department);
    formData.set('location', values.location);
    formData.set('employmentType', values.employmentType);
    formData.set('status', values.status);
    formData.set('startDate', values.startDate);
    formData.set('bio', values.bio ?? '');
    formData.set('email', values.email ?? '');
    formData.set('phone', values.phone ?? '');
    if (values.featured) formData.set('featured', 'on');
    if (photoFile) formData.set('photo', photoFile);

    startTransition(async () => {
      const result = staffId
        ? await updateStaff(staffId, formData)
        : await createStaff(formData);

      if (result?.error) {
        setServerError(result.error);
        toast.error(result.error);
        return;
      }

      toast.success(staffId ? 'Staff member updated' : 'Staff member created');
      router.push('/admin/staff');
      router.refresh();
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 w-full max-w-3xl space-y-8 overflow-x-hidden"
    >
      <section className="rounded-2xl border border-black/10 bg-white p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-black/50">
          Photo
        </h2>
        <div className="mt-4 flex items-center gap-4">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full bg-gray-100">
            {preview && (
              <Image
                src={preview}
                alt="Preview"
                width={80}
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
      </section>

      <section className="grid min-w-0 gap-6 rounded-2xl border border-black/10 bg-white p-6 sm:grid-cols-2">
        <Field label="Full Name" error={errors.fullName?.message}>
          <Input {...register('fullName')} />
        </Field>
        <Field
          label="Public Slug (used in the profile URL)"
          error={errors.slug?.message}
        >
          <Input {...register('slug')} placeholder="john-adebayo" />
        </Field>
        <Field label="Staff ID" error={errors.staffId?.message}>
          <Input {...register('staffId')} placeholder="EMP-02481" />
        </Field>
        <Field label="Title" error={errors.title?.message}>
          <Input {...register('title')} placeholder="Senior Software Engineer" />
        </Field>
        <Field label="Department" error={errors.department?.message}>
          <Input {...register('department')} />
        </Field>
        <Field label="Location" error={errors.location?.message}>
          <Input {...register('location')} />
        </Field>
        <Field label="Employment Type">
          <Controller
            control={control}
            name="employmentType"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FULL_TIME">Full-Time</SelectItem>
                  <SelectItem value="PART_TIME">Part-Time</SelectItem>
                  <SelectItem value="CONTRACT">Contract</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </Field>
        <Field label="Status">
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="FORMER">Former</SelectItem>
                  <SelectItem value="SUSPENDED">Suspended</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </Field>
        <Field label="Start Date" error={errors.startDate?.message}>
          <Input type="date" {...register('startDate')} />
        </Field>
        <Field label="Work Email" error={errors.email?.message}>
          <Input type="email" {...register('email')} />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <Input {...register('phone')} />
        </Field>
      </section>

      <section className="rounded-2xl border border-black/10 bg-white p-6">
        <Field label="Bio (shown on the public profile)" error={errors.bio?.message}>
          <Textarea rows={4} {...register('bio')} />
        </Field>
        <label className="mt-4 flex items-center gap-2 text-sm text-black/70">
          <input type="checkbox" {...register('featured')} className="h-4 w-4" />
          Feature on the homepage
        </label>
      </section>

      {serverError && <p className="text-sm text-red-600">{serverError}</p>}

      <div className="flex items-center gap-3">
        <Button
          type="submit"
          disabled={isPending}
          className="bg-[#ef6e11] hover:bg-[#ef6e11]/90"
        >
          {isPending ? 'Saving…' : staffId ? 'Save Changes' : 'Create Staff Member'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/staff')}>
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
    <div className="min-w-0 space-y-1.5">
      <Label className="block break-words leading-snug">{label}</Label>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

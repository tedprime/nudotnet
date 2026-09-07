'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition, type ReactNode } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import { projectFormSchema, type ProjectFormValues } from './schema';
import { createProject, updateProject } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Props = {
  projectId?: string;
  imageUrl?: string | null;
  defaultValues?: Partial<ProjectFormValues>;
};

const EMPTY_DEFAULTS: ProjectFormValues = {
  slug: '',
  name: '',
  category: '',
  badge: '',
  oneLiner: '',
  problem: '',
  whatWeBuilt: '',
  stack: '',
  outcome: '',
  href: '',
  featured: false,
  order: 0,
};

export function ProjectForm({ projectId, imageUrl, defaultValues }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [preview, setPreview] = useState<string | null>(imageUrl ?? null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: { ...EMPTY_DEFAULTS, ...defaultValues },
  });

  const onSubmit = (values: ProjectFormValues) => {
    setServerError(null);
    const formData = new FormData();
    formData.set('slug', values.slug);
    formData.set('name', values.name);
    formData.set('category', values.category);
    formData.set('badge', values.badge);
    formData.set('oneLiner', values.oneLiner);
    formData.set('problem', values.problem);
    formData.set('whatWeBuilt', values.whatWeBuilt);
    formData.set('stack', values.stack);
    formData.set('outcome', values.outcome);
    formData.set('href', values.href ?? '');
    formData.set('order', String(values.order ?? 0));
    if (values.featured) formData.set('featured', 'on');
    if (imageFile) formData.set('image', imageFile);

    startTransition(async () => {
      const result = projectId
        ? await updateProject(projectId, formData)
        : await createProject(formData);

      if (result?.error) {
        setServerError(result.error);
        toast.error(result.error);
        return;
      }

      toast.success(projectId ? 'Project updated' : 'Project created');
      router.push('/admin/projects');
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 max-w-3xl space-y-8">
      <section className="rounded-2xl border border-black/10 bg-white p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-black/50">
          Cover Image
        </h2>
        <div className="mt-4 flex items-center gap-4">
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
      </section>

      <section className="grid gap-6 rounded-2xl border border-black/10 bg-white p-6 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <Input {...register('name')} />
        </Field>
        <Field label="Slug" error={errors.slug?.message}>
          <Input {...register('slug')} placeholder="certigo" />
        </Field>
        <Field label="Category" error={errors.category?.message}>
          <Input {...register('category')} placeholder="SaaS / Own Product" />
        </Field>
        <Field label="Badge" error={errors.badge?.message}>
          <Input {...register('badge')} placeholder="Own Product" />
        </Field>
        <Field label="Live URL (optional)" error={errors.href?.message}>
          <Input {...register('href')} placeholder="https://usecertigo.com" />
        </Field>
        <Field label="Sort Order" error={errors.order?.message}>
          <Input type="number" {...register('order', { valueAsNumber: true })} />
        </Field>
      </section>

      <section className="space-y-6 rounded-2xl border border-black/10 bg-white p-6">
        <Field label="One-liner" error={errors.oneLiner?.message}>
          <Textarea rows={2} {...register('oneLiner')} />
        </Field>
        <Field label="The Problem" error={errors.problem?.message}>
          <Textarea rows={3} {...register('problem')} />
        </Field>
        <Field
          label="What We Built (one item per line)"
          error={errors.whatWeBuilt?.message}
        >
          <Textarea rows={4} {...register('whatWeBuilt')} />
        </Field>
        <Field label="Tech Stack (comma-separated)" error={errors.stack?.message}>
          <Input {...register('stack')} placeholder="Next.js, PostgreSQL, AI Proctoring" />
        </Field>
        <Field label="Outcome" error={errors.outcome?.message}>
          <Textarea rows={3} {...register('outcome')} />
        </Field>
        <label className="flex items-center gap-2 text-sm text-black/70">
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
          {isPending ? 'Saving…' : projectId ? 'Save Changes' : 'Create Project'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/projects')}>
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

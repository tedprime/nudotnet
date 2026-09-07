import { z } from 'zod';

export const industryFormSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  description: z.string().min(2, 'Description is required'),
  order: z.number().int().optional(),
});

export type IndustryFormValues = z.infer<typeof industryFormSchema>;

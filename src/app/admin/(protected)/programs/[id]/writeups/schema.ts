import { z } from 'zod';

export const writeupFormSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  body: z.string().min(2, 'Body is required'),
  order: z.number().int().optional(),
});

export type WriteupFormValues = z.infer<typeof writeupFormSchema>;

import { z } from 'zod';

export const trainingHighlightFormSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  description: z.string().min(2, 'Description is required'),
  order: z.number().int().optional(),
});

export type TrainingHighlightFormValues = z.infer<typeof trainingHighlightFormSchema>;

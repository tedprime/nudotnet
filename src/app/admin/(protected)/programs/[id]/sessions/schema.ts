import { z } from 'zod';

export const sessionFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  description: z.string().min(2, 'Description is required'),
  order: z.number().int().optional(),
});

export type SessionFormValues = z.infer<typeof sessionFormSchema>;

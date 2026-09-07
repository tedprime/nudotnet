import { z } from 'zod';
import { ICON_KEYS } from '@/lib/icons';

export const capabilityFormSchema = z.object({
  section: z.enum(['HOME', 'SOLUTIONS']),
  icon: z.enum(ICON_KEYS as [string, ...string[]]),
  title: z.string().min(2, 'Title is required'),
  description: z.string().min(2, 'Description is required'),
  order: z.number().int().optional(),
});

export type CapabilityFormValues = z.infer<typeof capabilityFormSchema>;

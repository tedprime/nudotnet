import { z } from 'zod';

export const projectFormSchema = z.object({
  slug: z
    .string()
    .min(2, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Lowercase letters, numbers, and hyphens only'),
  name: z.string().min(2, 'Name is required'),
  category: z.string().min(2, 'Category is required'),
  badge: z.string().min(2, 'Badge is required'),
  oneLiner: z.string().min(2, 'One-liner is required'),
  problem: z.string().min(2, 'Problem is required'),
  // One item per line in the form; split into a string[] server-side.
  whatWeBuilt: z.string().min(2, 'List at least one thing you built'),
  // Comma-separated in the form; split into a string[] server-side.
  stack: z.string().min(2, 'List at least one stack item'),
  outcome: z.string().min(2, 'Outcome is required'),
  href: z.string().url('Enter a valid URL').optional().or(z.literal('')),
  featured: z.boolean().optional(),
  // Plain (uncoerced) number: the client form supplies a real number via
  // RHF's `valueAsNumber`, and the server action converts the FormData
  // string itself before validating — see actions.ts.
  order: z.number().int().optional(),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;

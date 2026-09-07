import { z } from 'zod';

export const eventFormSchema = z
  .object({
    date: z.string().min(1, 'Date is required'),
    headline: z.string().min(2, 'Headline is required'),
    description: z.string().min(2, 'Description is required'),
    order: z.number().int().optional(),
    // When `hasArticle` is on, this item gets its own page at /News/[slug]
    // (slug + body); otherwise it just links out via `link` + `external`.
    hasArticle: z.boolean().optional(),
    slug: z
      .string()
      .regex(/^[a-z0-9-]+$/, 'Lowercase letters, numbers, and hyphens only')
      .optional()
      .or(z.literal('')),
    body: z.string().optional().or(z.literal('')),
    link: z.string().optional().or(z.literal('')),
    external: z.boolean().optional(),
  })
  .refine((data) => !data.hasArticle || (data.slug && data.body), {
    message: 'A slug and body are required when this has its own article page.',
    path: ['body'],
  })
  .refine((data) => data.hasArticle || data.link, {
    message: 'A link is required unless this has its own article page.',
    path: ['link'],
  });

export type EventFormValues = z.infer<typeof eventFormSchema>;

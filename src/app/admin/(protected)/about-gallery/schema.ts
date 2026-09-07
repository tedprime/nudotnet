import { z } from 'zod';

export const aboutGalleryFormSchema = z.object({
  alt: z.string().min(2, 'Alt text is required'),
  order: z.number().int().optional(),
});

export type AboutGalleryFormValues = z.infer<typeof aboutGalleryFormSchema>;

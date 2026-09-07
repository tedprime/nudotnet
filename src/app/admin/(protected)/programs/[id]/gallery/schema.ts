import { z } from 'zod';

export const galleryImageFormSchema = z.object({
  group: z.string().optional().or(z.literal('')),
  order: z.number().int().optional(),
});

export type GalleryImageFormValues = z.infer<typeof galleryImageFormSchema>;

import { z } from 'zod';

export const partnerLogoFormSchema = z.object({
  alt: z.string().min(2, 'Alt text is required'),
  order: z.number().int().optional(),
});

export type PartnerLogoFormValues = z.infer<typeof partnerLogoFormSchema>;

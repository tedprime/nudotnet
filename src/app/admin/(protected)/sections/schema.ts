import { z } from 'zod';

export const sectionIntroFormSchema = z.object({
  eyebrow: z.string().min(1, 'Eyebrow is required'),
  heading: z.string().optional().or(z.literal('')),
  body: z.string().min(2, 'Body is required'),
  secondaryBody: z.string().optional().or(z.literal('')),
});

export type SectionIntroFormValues = z.infer<typeof sectionIntroFormSchema>;

export const SECTION_LABELS: Record<string, string> = {
  HOME_ABOUT: 'Home — "Who We Are"',
  HOME_TRAINING: 'Home — "Training & Capacity Development"',
};

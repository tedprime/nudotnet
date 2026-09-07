import { z } from 'zod';

export const pageHeroFormSchema = z.object({
  page: z.enum([
    'HOME',
    'SOLUTIONS',
    'ABOUT',
    'PROJECTS',
    'CONTACT',
    'EDUBOX',
    'NEWS_BAC',
  ]),
  order: z.number().int().optional(),
  eyebrow: z.string().min(1, 'Eyebrow is required'),
  body: z.string().min(2, 'Body is required'),
  bgColor: z
    .string()
    .regex(/^#([0-9a-fA-F]{6})$/, 'Use a 6-digit hex color, e.g. #1e90ff')
    .optional()
    .or(z.literal('')),
  ctaLabel: z.string().optional().or(z.literal('')),
  ctaHref: z.string().optional().or(z.literal('')),
  ctaExternal: z.boolean().optional(),
});

export type PageHeroFormValues = z.infer<typeof pageHeroFormSchema>;

export const HERO_PAGE_LABELS: Record<string, string> = {
  HOME: 'Home (multi-slide)',
  SOLUTIONS: 'Solutions',
  ABOUT: 'About',
  PROJECTS: 'Projects',
  CONTACT: 'Contact',
  EDUBOX: 'EduBox',
  NEWS_BAC: 'News — BAC Article',
};

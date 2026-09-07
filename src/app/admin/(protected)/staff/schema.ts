import { z } from 'zod';

export const staffFormSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  slug: z
    .string()
    .min(2, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Lowercase letters, numbers, and hyphens only'),
  staffId: z.string().min(2, 'Staff ID is required'),
  title: z.string().min(2, 'Title is required'),
  department: z.string().min(2, 'Department is required'),
  location: z.string().min(2, 'Location is required'),
  employmentType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN']),
  status: z.enum(['ACTIVE', 'FORMER', 'SUSPENDED']),
  startDate: z.string().optional().or(z.literal('')),
  bio: z.string().optional().or(z.literal('')),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  featured: z.boolean().optional(),
});

export type StaffFormValues = z.infer<typeof staffFormSchema>;

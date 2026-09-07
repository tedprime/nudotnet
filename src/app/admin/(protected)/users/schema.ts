import { z } from 'zod';

export const createAdminUserSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['SUPER_ADMIN', 'EDITOR']),
});

export type CreateAdminUserValues = z.infer<typeof createAdminUserSchema>;

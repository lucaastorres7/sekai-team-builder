import { any, z } from 'zod';

export const createUserSchema = z.object({
  username: z.string().min(3, 'username must have at least 3 characters'),
  email: z.string().email('invalid email'),
  password: z.string().min(6, 'password must have at least 6 characters'),
  isAdmin: z.boolean().optional(),
});

export const userSchema = createUserSchema.extend({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  team: z.array(any()).optional(),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UserSchema = z.infer<typeof userSchema>;

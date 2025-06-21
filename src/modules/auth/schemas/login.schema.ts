import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'You must provide an email' })
    .email('You must provide a valid email'),
  password: z.string({ required_error: 'You must provide a password' }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

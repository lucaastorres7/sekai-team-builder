import { z } from 'zod';

export const pageQuerySchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1));

export type PageQuerySchema = z.infer<typeof pageQuerySchema>;

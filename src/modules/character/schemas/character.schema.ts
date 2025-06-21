import { any, z } from 'zod';

export const characterSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  surname: z.string().optional(),
  unit: z.string(),
  imageUrl: z.string().url(),
  card: z.array(any()).optional(),
});

export type CharacterSchema = z.infer<typeof characterSchema>;

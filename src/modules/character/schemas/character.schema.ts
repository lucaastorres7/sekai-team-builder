import { Units } from '@prisma/client';
import { any, z } from 'zod';

export const updateCharacterSchema = z.object({
  name: z.string().optional(),
  surname: z.string().nullable().optional(),
  unit: z.nativeEnum(Units).optional(),
  imageUrl: z.string().url().optional(),
});

export const createCharacterSchema = z.object({
  name: z.string(),
  surname: z.string().nullable(),
  unit: z.nativeEnum(Units),
  imageUrl: z.string().url(),
});

export const characterSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  surname: z.string().nullable(),
  unit: z.nativeEnum(Units),
  imageUrl: z.string().url(),
  card: z.array(any()).optional(),
});

export type CharacterSchema = z.infer<typeof characterSchema>;
export type CreateCharacterSchema = z.infer<typeof createCharacterSchema>;
export type UpdateCharacterSchema = z.infer<typeof updateCharacterSchema>;

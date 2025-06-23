import { CardAttribute, CardRarity } from '@prisma/client';
import { any, z } from 'zod';

export const updateCardSchema = z.object({
  title: z.string().optional(),
  power: z.number().optional(),
  rarity: z.nativeEnum(CardRarity).optional(),
  attribute: z.nativeEnum(CardAttribute).optional(),
  imageUrl: z.string().url().optional(),
  characterId: z.string().uuid().optional(),
});

export const createCardSchema = z.object({
  title: z.string(),
  power: z.number(),
  rarity: z.nativeEnum(CardRarity),
  attribute: z.nativeEnum(CardAttribute),
  imageUrl: z.string().url(),
  characterId: z.string().uuid(),
});

export const cardSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  power: z.number(),
  rarity: z.nativeEnum(CardRarity),
  attribute: z.nativeEnum(CardAttribute),
  imageUrl: z.string().url(),
  characterId: z.string().uuid(),
});

export const cardWithTeamsSchema = cardSchema.extend({
  teams: z.array(any()).optional(),
});

export type CreateCardSchema = z.infer<typeof createCardSchema>;
export type CardSchema = z.infer<typeof cardSchema>;
export type UpdateCardSchema = z.infer<typeof updateCardSchema>;

import { CardAttribute, CardRarity } from '@prisma/client';
import { any, z } from 'zod';

export const cardSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  rarity: z.nativeEnum(CardRarity),
  attribute: z.nativeEnum(CardAttribute),
  imageUrl: z.string().url(),
  characterId: z.string().uuid(),
});

export const cardWithTeamsSchema = cardSchema.extend({
  teams: z.array(any()).optional(),
});

export type CardSchema = z.infer<typeof cardSchema>;

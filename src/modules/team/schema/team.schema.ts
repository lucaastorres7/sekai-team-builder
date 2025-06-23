import { string, z } from 'zod';

export const teamSchema = z.object({
  name: z.string(),
  cardsId: z.array(z.string().uuid()).length(5, 'a team must have 5 cards'),
});

export const createdTeamSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string().uuid(),
});

export type TeamSchema = z.infer<typeof teamSchema>;
export type CreatedTeamSchema = z.infer<typeof createdTeamSchema>;

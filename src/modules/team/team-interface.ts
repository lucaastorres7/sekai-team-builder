import { PageQuerySchema } from './schema/page-query.schema';
import {
  CreatedTeamSchema,
  TeamSchema,
  UpdateTeamSchema,
} from './schema/team.schema';

export abstract class ITeamRepository {
  abstract verifyTeamCard(cardsId: string[]): Promise<boolean>;
  abstract create(data: TeamSchema, userId: string): Promise<CreatedTeamSchema>;
  abstract getAll(
    userId: string,
    page: PageQuerySchema,
  ): Promise<CreatedTeamSchema[] | null>;
  abstract getById(
    teamId: string,
    userId: string,
  ): Promise<CreatedTeamSchema | null>;
  abstract update(
    data: UpdateTeamSchema,
    teamId: string,
    userId: string,
  ): Promise<boolean>;
  abstract delete(teamId: string, userId: string): Promise<boolean>;
}

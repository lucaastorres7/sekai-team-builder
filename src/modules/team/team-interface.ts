import { PageQuerySchema } from './schema/page-query.schema';
import { CreatedTeamSchema, TeamSchema } from './schema/team.schema';

export abstract class ITeamRepository {
  abstract create(data: TeamSchema, userId: string): Promise<CreatedTeamSchema>;
  abstract getAll(
    userId: string,
    page: PageQuerySchema,
  ): Promise<CreatedTeamSchema[] | null>;
  abstract getById(
    teamId: string,
    userId: string,
  ): Promise<CreatedTeamSchema | null>;
}

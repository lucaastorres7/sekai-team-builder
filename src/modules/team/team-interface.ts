import { CreatedTeamSchema, TeamSchema } from './schema/team.schema';

export abstract class ITeamRepository {
  abstract create(data: TeamSchema, userId: string): Promise<CreatedTeamSchema>;
}

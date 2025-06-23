import { Injectable } from '@nestjs/common';
import { ITeamRepository } from './team-interface';
import { TeamSchema } from './schema/team.schema';
import { PageQuerySchema } from './schema/page-query.schema';

@Injectable()
export class TeamService {
  constructor(private readonly team: ITeamRepository) {}

  createTeam(body: TeamSchema, userId: string) {
    return this.team.create(body, userId);
  }

  getTeams(userId: string, page: PageQuerySchema) {
    return this.team.getAll(userId, page);
  }
}

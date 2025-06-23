import { Injectable } from '@nestjs/common';
import { ITeamRepository } from './team-interface';
import { TeamSchema, UpdateTeamSchema } from './schema/team.schema';
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

  getTeam(teamId: string, userId: string) {
    return this.team.getById(teamId, userId);
  }

  updateTeam(data: UpdateTeamSchema, teamId: string, userId: string) {
    return this.team.update(data, teamId, userId);
  }

  deleteTeam(teamId: string, userId: string) {
    return this.team.delete(teamId, userId);
  }
}

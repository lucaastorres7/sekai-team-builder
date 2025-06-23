import { Injectable } from '@nestjs/common';
import { ITeamRepository } from './team-interface';
import { TeamSchema } from './schema/team.schema';

@Injectable()
export class TeamService {
  constructor(private readonly team: ITeamRepository) {}

  createTeam(body: TeamSchema, userId: string) {
    return this.team.create(body, userId);
  }
}

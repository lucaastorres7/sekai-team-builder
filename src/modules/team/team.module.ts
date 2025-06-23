import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { ITeamRepository } from './team-interface';
import { PrismaTeamRepository } from './prisma/prisma-team.repository';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TeamController],
  providers: [
    TeamService,
    { provide: ITeamRepository, useClass: PrismaTeamRepository },
  ],
})
export class TeamModule {}

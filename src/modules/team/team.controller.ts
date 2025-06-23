import { AuthGuard } from '@/security/guards/auth.guard';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { teamSchema, TeamSchema } from './schema/team.schema';
import { Request } from 'express';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';
import { pageQuerySchema, PageQuerySchema } from './schema/page-query.schema';

const queryValPipe = new ZodValidationPipe(pageQuerySchema);

@UseGuards(AuthGuard)
@Controller('/teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(teamSchema))
  CreateTeam(@Body() body: TeamSchema, @Req() req: Request) {
    const userId = req.user.sub;

    return this.teamService.createTeam(body, userId);
  }

  @Get()
  GetTeams(
    @Req() req: Request,
    @Query('page', queryValPipe) page: PageQuerySchema,
  ) {
    const userId = req.user.sub;

    return this.teamService.getTeams(userId, page);
  }
}

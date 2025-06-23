import { AuthGuard } from '@/security/guards/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { TeamService } from './team.service';
import {
  teamSchema,
  TeamSchema,
  UpdateTeamSchema,
  updateTeamSchema,
} from './schema/team.schema';
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
  createTeam(@Body() body: TeamSchema, @Req() req: Request) {
    const userId = req.user.sub;

    return this.teamService.createTeam(body, userId);
  }

  @Get()
  getTeams(
    @Req() req: Request,
    @Query('page', queryValPipe) page: PageQuerySchema,
  ) {
    const userId = req.user.sub;

    return this.teamService.getTeams(userId, page);
  }

  @Get('/:id')
  getTeamId(@Param('id') teamId: string, @Req() req: Request) {
    const userId = req.user.sub;

    return this.teamService.getTeam(teamId, userId);
  }

  @Put('/:id')
  updateTeam(
    @Body(new ZodValidationPipe(updateTeamSchema)) data: UpdateTeamSchema,
    @Param('id') teamId: string,
    @Req() req: Request,
  ) {
    const userId = req.user.sub;

    return this.teamService.updateTeam(data, teamId, userId);
  }

  @Delete('/:id')
  deleteTeam(@Param('id') teamId: string, @Req() req: Request) {
    const userId = req.user.sub;

    return this.teamService.deleteTeam(teamId, userId);
  }
}

import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { ITeamRepository } from '../team-interface';
import {
  CreatedTeamSchema,
  teamSchema,
  TeamSchema,
  UpdateTeamSchema,
} from '../schema/team.schema';
import { PageQuerySchema } from '../schema/page-query.schema';

@Injectable()
export class PrismaTeamRepository implements ITeamRepository {
  constructor(private readonly prisma: PrismaService) {}

  async verifyTeamCard(cardsId: string[]): Promise<boolean> {
    const foundCards = await this.prisma.card.findMany({
      where: {
        id: {
          in: cardsId,
        },
      },
      select: {
        characterId: true,
      },
    });

    if (foundCards.length !== cardsId.length) {
      throw new BadRequestException('one or more cards do not exist');
    }

    const characterIds = foundCards.map((card) => card.characterId);
    const uniqueId = new Set(characterIds);

    if (characterIds.length !== uniqueId.size) {
      throw new ConflictException(
        'you cannot have more than one card of the same character',
      );
    }

    return true;
  }

  async create(body: TeamSchema, userId: string): Promise<CreatedTeamSchema> {
    const { name, cardsId } = body;

    await this.verifyTeamCard(cardsId);

    const cardsToConnect = cardsId.map((id) => ({ id }));

    const team = await this.prisma.team.create({
      data: {
        name,
        user: {
          connect: { id: userId },
        },
        cards: {
          connect: cardsToConnect,
        },
      },
      include: {
        cards: true,
      },
    });

    return team;
  }

  async getAll(
    userId: string,
    page: PageQuerySchema,
  ): Promise<CreatedTeamSchema[] | null> {
    const teams = await this.prisma.team.findMany({
      where: { userId },
      include: { cards: true },
      take: 5,
      skip: (page - 1) * 5,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return teams;
  }

  async getById(
    teamId: string,
    userId: string,
  ): Promise<CreatedTeamSchema | null> {
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
      include: { cards: true },
    });

    if (!team) {
      throw new NotFoundException(`team not found`);
    }

    if (team.userId !== userId) {
      throw new ForbiddenException('This team is not yours');
    }

    return team;
  }

  async update(
    body: UpdateTeamSchema,
    teamId: string,
    userId: string,
  ): Promise<boolean> {
    const { cardsId, name } = body;
    const cardsToConnect = cardsId?.map((card) => ({ id: card }));

    const team = await this.prisma.team.findUnique({ where: { id: teamId } });

    if (!team) {
      throw new NotFoundException('this team does not exist');
    }

    if (userId !== team.userId) {
      throw new ForbiddenException('This team is not yours');
    }

    const changeTeam = await this.prisma.team.update({
      where: { id: teamId },
      data: {
        name,
        cards: {
          connect: cardsToConnect,
        },
      },
    });

    return true;
  }

  async delete(teamId: string, userId: string): Promise<boolean> {
    const team = await this.prisma.team.findUnique({ where: { id: teamId } });

    if (!team) {
      throw new NotFoundException('this team does not exist');
    }

    if (userId !== team.userId) {
      throw new ForbiddenException('This team is not yours');
    }

    await this.prisma.team.delete({ where: { id: teamId } });

    return true;
  }
}

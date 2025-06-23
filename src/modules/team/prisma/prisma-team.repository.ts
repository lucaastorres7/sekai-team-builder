import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { ITeamRepository } from '../team-interface';
import {
  CreatedTeamSchema,
  teamSchema,
  TeamSchema,
} from '../schema/team.schema';
import { PageQuerySchema } from '../schema/page-query.schema';

@Injectable()
export class PrismaTeamRepository implements ITeamRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: TeamSchema, userId: string): Promise<CreatedTeamSchema> {
    const { name, cardsId } = body;
    const cardsToConnect = cardsId.map((card) => ({ id: card }));

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
    const teams = this.prisma.team.findMany({
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
}

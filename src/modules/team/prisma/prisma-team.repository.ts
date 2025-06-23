import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { ITeamRepository } from '../team-interface';
import {
  CreatedTeamSchema,
  teamSchema,
  TeamSchema,
} from '../schema/team.schema';

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
}

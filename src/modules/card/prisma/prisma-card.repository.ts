import { Injectable } from '@nestjs/common';
import { ICardRepository } from '../card-interface';
import { CardSchema } from '../schema/card.schema';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class PrismaCardRepository implements ICardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(query: string): Promise<CardSchema[] | null> {
    if (!query) return await this.prisma.card.findMany();

    const cards = await this.prisma.card.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });

    return cards;
  }
}

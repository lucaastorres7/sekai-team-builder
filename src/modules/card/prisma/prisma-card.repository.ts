import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ICardRepository } from '../card-interface';
import { CardSchema, CreateCardSchema } from '../schema/card.schema';
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

  async create(data: CreateCardSchema): Promise<CardSchema> {
    const charExist = await this.prisma.character.findFirst({
      where: { id: data.characterId },
    });

    if (!charExist) {
      throw new NotFoundException('Character does not exist');
    }

    const cardExist = await this.prisma.card.findUnique({
      where: { title: data.title },
    });

    if (cardExist) {
      throw new BadRequestException('a card with this title already exists');
    }

    const card = await this.prisma.card.create({ data });

    return card;
  }
}

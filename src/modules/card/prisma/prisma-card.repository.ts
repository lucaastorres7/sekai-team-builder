import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ICardRepository } from '../card-interface';
import {
  CardSchema,
  CreateCardSchema,
  UpdateCardSchema,
} from '../schema/card.schema';
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

  async getById(id: string): Promise<CardSchema> {
    const card = await this.prisma.card.findUnique({
      where: { id },
    });

    if (!card) {
      throw new NotFoundException(`card not found`);
    }

    return card;
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

  async update(data: UpdateCardSchema, id: string): Promise<boolean> {
    const exist = await this.prisma.card.findUnique({ where: { id } });

    if (!exist) {
      throw new NotFoundException('This card does not exist');
    }

    const card = await this.prisma.card.update({
      where: { id },
      data,
    });

    return true;
  }

  async delete(id: string): Promise<boolean> {
    const card = await this.prisma.card.findUnique({ where: { id } });

    if (!card) {
      throw new NotFoundException('this card does not exist');
    }

    await this.prisma.card.delete({ where: { id } });

    return true;
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { ICharacterRepository } from '../character-interface';
import {
  CharacterSchema,
  CreateCharacterSchema,
} from '../schemas/character.schema';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class PrismaCharacterRepository implements ICharacterRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(query: string): Promise<CharacterSchema[] | null> {
    if (!query) return await this.prisma.character.findMany();

    const characters = await this.prisma.character.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            surname: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    return characters;
  }

  async create(data: CreateCharacterSchema): Promise<CharacterSchema> {
    const exist = await this.prisma.character.findFirst({
      where: { name: data.name, unit: data.unit },
    });

    if (exist) {
      throw new BadRequestException(
        `there is already a ${exist.name} in ${exist.unit}`,
      );
    }

    const character = await this.prisma.character.create({ data });

    return character;
  }
}

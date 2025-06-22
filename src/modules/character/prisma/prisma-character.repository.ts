import { Injectable } from '@nestjs/common';
import { ICharacterRepository } from '../character-interface';
import { CharacterSchema } from '../schemas/character.schema';
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
}

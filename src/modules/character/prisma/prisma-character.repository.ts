import { Injectable } from '@nestjs/common';
import { ICharacterRepository } from '../character-interface';
import { CharacterSchema } from '../schemas/character.schema';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class PrismaCharacterRepository implements ICharacterRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<CharacterSchema[] | null> {
    const characters = await this.prisma.character.findMany();

    return characters;
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ICharacterRepository } from '../character-interface';
import {
  CharacterSchema,
  CreateCharacterSchema,
  UpdateCharacterSchema,
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

  async getById(id: string): Promise<CharacterSchema | null> {
    const character = await this.prisma.character.findUnique({
      where: { id },
    });

    if (!character) {
      throw new NotFoundException(`character not found`);
    }

    return character;
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

  async update(data: UpdateCharacterSchema, id: string): Promise<boolean> {
    const exist = await this.prisma.character.findUnique({ where: { id } });

    if (!exist) {
      throw new NotFoundException('This character does not exist');
    }

    const character = await this.prisma.character.update({
      where: { id },
      data,
    });

    return true;
  }

  async delete(id: string): Promise<boolean> {
    const exist = await this.prisma.character.findUnique({ where: { id } });

    if (!exist) {
      throw new NotFoundException('this character does not exist');
    }

    await this.prisma.character.delete({ where: { id } });

    return true;
  }
}

import { Injectable } from '@nestjs/common';
import { ICharacterRepository } from './character-interface';
import { CreateCharacterSchema } from './schemas/character.schema';

@Injectable()
export class CharacterService {
  constructor(private readonly character: ICharacterRepository) {}

  getAll(query: string) {
    const characters = this.character.getAll(query || '');
    return characters;
  }

  create(body: CreateCharacterSchema) {
    return this.character.create(body);
  }
}

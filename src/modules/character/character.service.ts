import { Injectable } from '@nestjs/common';
import { ICharacterRepository } from './character-interface';
import {
  CreateCharacterSchema,
  UpdateCharacterSchema,
} from './schemas/character.schema';

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

  update(body: UpdateCharacterSchema, id: string) {
    return this.character.update(body, id);
  }

  delete(id: string) {
    return this.character.delete(id);
  }
}

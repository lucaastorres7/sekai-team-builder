import { Injectable } from '@nestjs/common';
import { ICharacterRepository } from './character-interface';

@Injectable()
export class CharacterService {
  constructor(private readonly character: ICharacterRepository) {}

  getAll() {
    const characters = this.character.getAll();
    return characters;
  }
}

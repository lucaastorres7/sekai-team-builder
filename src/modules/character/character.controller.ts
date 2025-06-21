import { Controller, Get, Query } from '@nestjs/common';
import { CharacterService } from './character.service';

@Controller('/characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  getCharacters() {
    return this.characterService.getAll();
  }
}

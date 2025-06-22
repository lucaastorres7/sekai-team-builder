import { Controller, Get, Query } from '@nestjs/common';
import { CharacterService } from './character.service';

@Controller('/characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  getCharacters(@Query('name') query: string) {
    return this.characterService.getAll(query || '');
  }
}

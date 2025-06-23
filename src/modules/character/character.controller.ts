import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { AdminGuard } from '@/security/guards/admin.guard';
import {
  createCharacterSchema,
  CreateCharacterSchema,
} from './schemas/character.schema';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';

@Controller('/characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  getCharacters(@Query('name') query: string) {
    return this.characterService.getAll(query || '');
  }

  @UseGuards(AdminGuard)
  @Post()
  @UsePipes(new ZodValidationPipe(createCharacterSchema))
  createCharacter(@Body() body: CreateCharacterSchema) {
    return this.characterService.create(body);
  }
}

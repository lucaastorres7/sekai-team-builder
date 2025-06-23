import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { AdminGuard } from '@/security/guards/admin.guard';
import {
  createCharacterSchema,
  CreateCharacterSchema,
  UpdateCharacterSchema,
  updateCharacterSchema,
} from './schemas/character.schema';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';

@Controller('/characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  getCharacters(@Query('name') query: string) {
    return this.characterService.getAll(query || '');
  }

  @Get('/:id')
  getCharacterById(@Param('id') id: string) {
    return this.characterService.getById(id);
  }

  @UseGuards(AdminGuard)
  @Post()
  @UsePipes(new ZodValidationPipe(createCharacterSchema))
  createCharacter(@Body() body: CreateCharacterSchema) {
    return this.characterService.create(body);
  }

  @UseGuards(AdminGuard)
  @Put('/:id')
  updateCharacter(
    @Body(new ZodValidationPipe(updateCharacterSchema))
    body: UpdateCharacterSchema,
    @Param('id') id: string,
  ) {
    return this.characterService.update(body, id);
  }

  @UseGuards(AdminGuard)
  @Delete('/:id')
  deleteCharacter(@Param('id') id: string) {
    return this.characterService.delete(id);
  }
}

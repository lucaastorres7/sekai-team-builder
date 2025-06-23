import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CardService } from './card.service';
import { AdminGuard } from '@/security/guards/admin.guard';
import { createCardSchema, CreateCardSchema } from './schema/card.schema';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';

@Controller('/cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  getCards(@Query('title') query: string) {
    return this.cardService.getAll(query || '');
  }

  @Get('/:id')
  getCard(@Param('id') id: string) {
    return this.cardService.getById(id);
  }

  @UseGuards(AdminGuard)
  @Post()
  @UsePipes(new ZodValidationPipe(createCardSchema))
  createCard(@Body() body: CreateCardSchema) {
    return this.cardService.create(body);
  }
}

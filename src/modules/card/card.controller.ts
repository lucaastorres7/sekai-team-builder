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
import { CardService } from './card.service';
import { AdminGuard } from '@/security/guards/admin.guard';
import {
  createCardSchema,
  CreateCardSchema,
  updateCardSchema,
  UpdateCardSchema,
} from './schema/card.schema';
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

  @UseGuards(AdminGuard)
  @Put('/:id')
  updateCard(
    @Body(new ZodValidationPipe(updateCardSchema)) body: UpdateCardSchema,
    @Param('id') id: string,
  ) {
    return this.cardService.update(body, id);
  }

  @UseGuards(AdminGuard)
  @Delete('/:id')
  deleteCard(@Param('id') id: string) {
    return this.cardService.delete(id);
  }
}

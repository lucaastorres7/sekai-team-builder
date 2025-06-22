import { Controller, Get, Query } from '@nestjs/common';
import { CardService } from './card.service';

@Controller('/cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  getCards(@Query('title') query: string) {
    return this.cardService.getAll(query || '');
  }
}

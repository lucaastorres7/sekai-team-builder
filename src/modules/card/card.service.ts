import { Injectable } from '@nestjs/common';
import { ICardRepository } from './card-interface';

@Injectable()
export class CardService {
  constructor(private readonly card: ICardRepository) {}

  getAll(query: string) {
    return this.card.getAll(query || '');
  }
}

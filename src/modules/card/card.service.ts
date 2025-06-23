import { Injectable } from '@nestjs/common';
import { ICardRepository } from './card-interface';
import { CreateCardSchema } from './schema/card.schema';

@Injectable()
export class CardService {
  constructor(private readonly card: ICardRepository) {}

  getAll(query: string) {
    return this.card.getAll(query || '');
  }

  create(data: CreateCardSchema) {
    return this.card.create(data);
  }
}

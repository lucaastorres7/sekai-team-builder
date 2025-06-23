import { Injectable } from '@nestjs/common';
import { ICardRepository } from './card-interface';
import { CreateCardSchema, UpdateCardSchema } from './schema/card.schema';

@Injectable()
export class CardService {
  constructor(private readonly card: ICardRepository) {}

  getAll(query: string) {
    return this.card.getAll(query || '');
  }

  getById(id: string) {
    return this.card.getById(id);
  }

  create(data: CreateCardSchema) {
    return this.card.create(data);
  }

  update(data: UpdateCardSchema, id: string) {
    return this.card.update(data, id);
  }

  delete(id: string) {
    return this.card.delete(id);
  }
}

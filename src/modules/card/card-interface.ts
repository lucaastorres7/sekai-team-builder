import { CardSchema } from './schema/card.schema';

export abstract class ICardRepository {
  abstract getAll(query: string): Promise<CardSchema[] | null>;
}

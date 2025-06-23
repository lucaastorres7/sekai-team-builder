import { CardSchema, CreateCardSchema } from './schema/card.schema';

export abstract class ICardRepository {
  abstract getAll(query: string): Promise<CardSchema[] | null>;
  abstract create(data: CreateCardSchema): Promise<CardSchema>;
}

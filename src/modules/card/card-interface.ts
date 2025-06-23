import {
  CardSchema,
  CreateCardSchema,
  UpdateCardSchema,
} from './schema/card.schema';

export abstract class ICardRepository {
  abstract getAll(query: string): Promise<CardSchema[] | null>;
  abstract getById(id: string): Promise<CardSchema>;
  abstract create(data: CreateCardSchema): Promise<CardSchema>;
  abstract update(data: UpdateCardSchema, id: string): Promise<boolean>;
  abstract delete(id: string): Promise<boolean>;
}

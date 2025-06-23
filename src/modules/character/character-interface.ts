import {
  CharacterSchema,
  CreateCharacterSchema,
  UpdateCharacterSchema,
} from './schemas/character.schema';

export abstract class ICharacterRepository {
  abstract getAll(query: string): Promise<CharacterSchema[] | null>;
  abstract create(data: CreateCharacterSchema): Promise<CharacterSchema>;
  abstract update(data: UpdateCharacterSchema, id: string): Promise<boolean>;
  abstract delete(id: string): Promise<boolean>;
}

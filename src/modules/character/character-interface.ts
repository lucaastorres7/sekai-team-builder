import {
  CharacterSchema,
  CreateCharacterSchema,
} from './schemas/character.schema';

export abstract class ICharacterRepository {
  abstract getAll(query: string): Promise<CharacterSchema[] | null>;
  abstract create(data: CreateCharacterSchema): Promise<CharacterSchema>;
}

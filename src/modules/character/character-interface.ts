import { CharacterSchema } from './schemas/character.schema';

export abstract class ICharacterRepository {
  abstract getAll(query: string): Promise<CharacterSchema[] | null>;
}

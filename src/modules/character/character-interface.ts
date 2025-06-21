import { CharacterSchema } from './schemas/character.schema';

export abstract class ICharacterRepository {
  abstract getAll(): Promise<CharacterSchema[] | null>;
}

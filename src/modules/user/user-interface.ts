import { CreateUserSchema, UserSchema } from './schemas/create-user.schema';

export abstract class IUserRepository {
  abstract create(data: CreateUserSchema): Promise<UserSchema>;
  abstract findByEmail(email: string): Promise<UserSchema | null>;
  abstract delete(id: string, reqId: string): Promise<boolean>;
}

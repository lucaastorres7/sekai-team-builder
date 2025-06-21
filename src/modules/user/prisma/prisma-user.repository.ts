import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../user-interface';
import { CreateUserSchema, UserSchema } from '../schemas/create-user.schema';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserSchema): Promise<UserSchema> {
    const user = await this.prisma.user.create({ data });
    return user;
  }
}

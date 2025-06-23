import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async findByEmail(email: string): Promise<UserSchema | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async delete(id: string, reqId: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('user was not found');
    }

    if (user.id !== reqId) {
      throw new BadRequestException('You can not delete another user');
    }

    await this.prisma.user.delete({ where: { id } });

    return true;
  }
}

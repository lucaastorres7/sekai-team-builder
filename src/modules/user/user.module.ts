import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaUserRepository } from './prisma/prisma-user.repository';
import { IUserRepository } from './user-interface';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: IUserRepository, useClass: PrismaUserRepository },
  ],
})
export class UserModule {}

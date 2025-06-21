import { SecurityModule } from '@/security/security.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from '@/security/token.service';
import { IUserRepository } from '../user/user-interface';
import { PrismaUserRepository } from '../user/prisma/prisma-user.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [SecurityModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

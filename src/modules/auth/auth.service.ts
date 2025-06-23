import { TokenService } from '@/security/token.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginSchema } from './schemas/login.schema';
import { IUserRepository } from '../user/user-interface';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly user: IUserRepository,
  ) {}

  async login({ email, password }: LoginSchema) {
    const user = await this.user.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Your credentials do not match');
    }

    const pass = await compare(password, user.password);

    if (!pass) {
      throw new BadRequestException('Your credentials do not match');
    }

    const payload = { sub: user.id, isAdmin: user.isAdmin };

    const { token } = this.tokenService.getToken(payload);

    return { token };
  }
}

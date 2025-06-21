import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwt: JwtService) {}

  createToken(payload: Record<string, unknown>) {
    return this.jwt.sign(payload);
  }

  getToken(payload: Record<string, unknown>) {
    return { token: this.createToken(payload) };
  }
}

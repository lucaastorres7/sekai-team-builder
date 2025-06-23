import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthGuard } from './auth.guard';

@Injectable()
export class AdminGuard extends AuthGuard implements CanActivate {
  constructor(jwt: JwtService, config: ConfigService) {
    super(jwt, config);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuth = await super.canActivate(context);

    if (!isAuth) {
      return false;
    }

    const req: Request = context.switchToHttp().getRequest();
    const user = req['user'];

    if (!user.isAdmin) {
      throw new ForbiddenException('you are not an admin');
    }

    return true;
  }
}

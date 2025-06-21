import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { LoginSchema, loginSchema } from './schemas/login.schema';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UsePipes(new ZodValidationPipe(loginSchema))
  login(@Body() body: LoginSchema) {
    return this.authService.login(body);
  }
}

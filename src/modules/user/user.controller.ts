import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import {
  createUserSchema,
  CreateUserSchema,
} from './schemas/create-user.schema';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  createUser(@Body() body: CreateUserSchema) {
    return this.userService.create(body);
  }
}

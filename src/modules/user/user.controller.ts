import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  createUserSchema,
  CreateUserSchema,
} from './schemas/create-user.schema';
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe';
import { UserService } from './user.service';
import { AuthGuard } from '@/security/guards/auth.guard';
import { Request } from 'express';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  createUser(@Body() body: CreateUserSchema) {
    return this.userService.create(body);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  deleteAccount(@Param('id') id: string, @Req() req: Request) {
    const reqId = req.user.sub;

    return this.userService.delete(id, reqId);
  }
}

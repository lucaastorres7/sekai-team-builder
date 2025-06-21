import { BadRequestException, Injectable } from '@nestjs/common';
import { IUserRepository } from './user-interface';
import { CreateUserSchema } from './schemas/create-user.schema';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly user: IUserRepository) {}

  async create({ username, email, password }: CreateUserSchema) {
    const hashedPassword = await hash(password, 8);

    const alreadyExists = await this.user.findByEmail(email);

    if (alreadyExists) {
      throw new BadRequestException('This user already exists');
    }

    const user = await this.user.create({
      username,
      email,
      password: hashedPassword,
    });

    const { password: pass, ...info } = user;

    return { message: 'user created successfully' };
  }
}

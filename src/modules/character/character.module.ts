import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { ICharacterRepository } from './character-interface';
import { PrismaCharacterRepository } from './prisma/prisma-character.repository';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CharacterController],
  providers: [
    CharacterService,
    { provide: ICharacterRepository, useClass: PrismaCharacterRepository },
  ],
})
export class CharacterModule {}

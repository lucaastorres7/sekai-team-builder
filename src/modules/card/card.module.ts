import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { ICardRepository } from './card-interface';
import { PrismaCardRepository } from './prisma/prisma-card.repository';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CardController],
  providers: [
    CardService,
    { provide: ICardRepository, useClass: PrismaCardRepository },
  ],
})
export class CardModule {}

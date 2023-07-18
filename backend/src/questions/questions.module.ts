import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { Question } from '../entity/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guards/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  providers: [
    QuestionsService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [QuestionsController],
})
export class QuestionsModule {}

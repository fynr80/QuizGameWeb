import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('api/questions')
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  @Get()
  getQuestion(): string {
    return 'auth register';
  }

  @Post()
  createQuestion(): string {
    return 'auth register';
  }

  @Put()
  zpdateQuestion(): string {
    return 'auth register';
  }

  @Delete()
  deleteQuestion(): string {
    return 'auth register';
  }
}

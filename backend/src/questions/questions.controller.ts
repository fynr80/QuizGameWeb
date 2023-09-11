import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from './roles.decorator';

@Controller('api/questions')
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  @Get()
  @Roles('admin')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  async getAllQuestions() {
    const result = await this.questionService.getAllQuestions();
    return { result };
  }

  @Get(':id')
  @Roles('admin')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  async getQuestionById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.questionService.getQuestionById(id);
    return { result };
  }

  @Post()
  @Roles('admin')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  async createQuestion(
    @Body('description') description,
    @Body('answers') answers,
    @Body('correctAnswers') correctAnswers,
  ) {
    await this.questionService.createQuestion(
      description,
      answers,
      correctAnswers,
    );
    return { msg: 'Question successfully created' };
  }

  @Put(':id')
  @Roles('admin')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  async updateQuestion(
    @Param('id', ParseIntPipe) id: number,
    @Body('description') description,
    @Body('answers') answers,
    @Body('correctAnswers') correctAnswers,
  ) {
    await this.questionService.updateQuestion(
      id,
      description,
      answers,
      correctAnswers,
    );
    return { msg: 'Question successfully updated' };
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  async deleteQuestion(@Param('id', ParseIntPipe) id: number) {
    await this.questionService.deleteQeustion(id);
    return { msg: 'Question successfully deleted' };
  }
}

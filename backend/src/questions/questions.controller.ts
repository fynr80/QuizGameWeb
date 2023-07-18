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
import { Roles } from './roles.decorator';
import { Role } from './role.enum';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';

@Controller('api/questions')
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  async getAllQuestions() {
    const result = await this.questionService.getAllQuestions();
    return { result };
  }

  @Get(':id')
  @UseGuards(AuthenticatedGuard)
  async getQuestionById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.questionService.getQuestionById(id);
    return { result };
  }

  @Post()
  @UseGuards(AuthenticatedGuard)
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
  @UseGuards(AuthenticatedGuard)
  async updateQuestion(@Param('id', ParseIntPipe) id: number) {
    await this.questionService.updateQuestion(id);
    return { msg: 'Question successfully updated' };
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard)
  async deleteQuestion(@Param('id', ParseIntPipe) id: number) {
    await this.questionService.deleteQeustion(id);
    return { msg: 'Question successfully deleted' };
  }
}

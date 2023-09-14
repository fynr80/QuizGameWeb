import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/questions/roles.decorator';

@Controller('api')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  // Read particular quiz by username
  @Get('/quiz/:username')
  async getQuizzesByUserName(@Param('username') username: string) {
    return await this.quizService.getQuizByUserName(username);
  }

  // Create a new quiz
  @Post('/quiz/create')
  async createQuiz(
    @Body('username1') username1: string,
    @Body('username2') username2: string,
    //  @Body('user1Id') user1Id: number,
    //  @Body('user2Id') user2Id: number,
    @Body('whoWin') whoWin: string,
  ) {
    return await this.quizService.createQuiz(
      username1,
      username2,
      //  user1Id,
      //  user2Id,
      whoWin,
    );
  }
}

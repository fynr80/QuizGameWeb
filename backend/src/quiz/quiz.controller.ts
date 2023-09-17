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
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@Controller('api')
@ApiTags('Quiz')
@ApiOkResponse({ description: 'Alles hat Funktioniert' })
@ApiInternalServerErrorResponse({
  description: 'Ein Fehler ist aufgetreten',
})
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  // Read particular quiz by username
  @Get('/quiz/:username')
  @ApiParam({ name: 'username', description: 'Der Username des Benutzers' })
  async getQuizzesByUserName(@Param('username') username: string) {
    return await this.quizService.getQuizByUserName(username);
  }

  // Create a new quiz
  @Post('/quiz/create')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username1: {
          type: 'string',
          description: 'Der erste Username',
        },
        username2: {
          type: 'string',
          description: 'Der zweite Username',
        },
        whoWin: {
          type: 'string',
          description: 'Der gewinner Username',
        },
      },
    },
  })
  async createQuiz(
    @Body('username1') username1: string,
    @Body('username2') username2: string,
    @Body('whoWin') whoWin: string,
  ) {
    return await this.quizService.createQuiz(username1, username2, whoWin);
  }
}

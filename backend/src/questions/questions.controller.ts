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
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@Controller('api/questions')
@ApiTags('Fragen')
@ApiOkResponse({ description: 'Alles hat Funktioniert' })
@ApiInternalServerErrorResponse({
  description: 'Ein Fehler ist aufgetreten',
})
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  @Get(':category')
  @ApiParam({ name: 'category', description: 'Die Kategorie ID' })
  @UseGuards(AuthenticatedGuard, RolesGuard)
  async getAllQuestions(@Param('category', ParseIntPipe) category: number) {
    const result = await this.questionService.getAllQuestions(category);
    return { result };
  }

  @Get(':id')
  @Roles('admin')
  @ApiParam({ name: 'id', description: 'Die Question ID' })
  @UseGuards(AuthenticatedGuard, RolesGuard)
  async getQuestionById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.questionService.getQuestionById(id);
    return { result };
  }

  @Post()
  @Roles('admin')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        description: {
          type: 'string',
          description: 'Die Frage',
        },
        answers: {
          type: 'array',
          description: 'Die Antworten',
          items: {
            type: 'string',
            description: 'Antworten',
          },
        },
        correctAnswers: {
          type: 'array',
          description: 'Die richtige Antowrt',
          items: {
            type: 'string',
            description: 'Antwort',
          },
        },
        c: {
          type: 'number',
          description: 'Die Kategorie Nummer',
        },
      },
    },
  })
  @UseGuards(AuthenticatedGuard, RolesGuard)
  async createQuestion(
    @Body('description') description,
    @Body('answers') answers,
    @Body('correctAnswers') correctAnswers,
    @Body('c') category,
  ) {
    await this.questionService.createQuestion(
      description,
      answers,
      correctAnswers,
      category,
    );
    return { msg: 'Question successfully created' };
  }

  @Put(':id')
  @Roles('admin')
  @ApiParam({ name: 'id', description: 'Die Question ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        description: {
          type: 'string',
          description: 'Die Frage',
        },
        answers: {
          type: 'array',
          description: 'Die Antworten',
          items: {
            type: 'string',
            description: 'Antworten',
          },
        },
        correctAnswers: {
          type: 'array',
          description: 'Die richtige Antowrt',
          items: {
            type: 'string',
            description: 'Antwort',
          },
        },
      },
    },
  })
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
  @ApiParam({ name: 'id', description: 'Die Question ID' })
  @UseGuards(AuthenticatedGuard, RolesGuard)
  async deleteQuestion(@Param('id', ParseIntPipe) id: number) {
    await this.questionService.deleteQeustion(id);
    return { msg: 'Question successfully deleted' };
  }
}

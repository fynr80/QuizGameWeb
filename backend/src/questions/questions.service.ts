import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Question } from '../entity/question.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionsRepositroy: Repository<Question>,
  ) {}

  async getAllQuestions() {
    return await this.questionsRepositroy.find({
      select: ['id', 'description', 'answers', 'correctAnswers'],
    });
  }

  async getQuestionById(id: number) {
    return await this.questionsRepositroy.findOne({
      where: { id: id },
    });
  }

  async createQuestion(
    description: string,
    answers: string[],
    correctAnswers: string[],
  ) {
    const question = new Question();
    question.description = description;
    question.answers = answers;
    question.correctAnswers = correctAnswers;

    await this.questionsRepositroy.save(question);
  }

  async updateQuestion(
    id: number,
    description?: string,
    answers?: string[],
    correctAnswers?: string[],
  ) {
    const question = await this.questionsRepositroy.findOne({
      where: { id: id },
    });

    if (description) {
      question.description = description;
    } else if (answers) {
      question.answers = answers;
    } else if (correctAnswers) {
      question.correctAnswers = correctAnswers;
    }

    await this.questionsRepositroy.save(question);
  }

  async deleteQeustion(id: number) {
    const question = await this.questionsRepositroy.findOne({
      where: { id: id },
    });

    await this.questionsRepositroy.remove(question);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Question } from '../entity/question.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionsRepositroy: Repository<Question>,
  ) {}

  async getAllQuestions(category: number) {
    const questions = await this.questionsRepositroy.find({
      where: {
        category: category,
      },
      select: ['id', 'description', 'answers', 'correctAnswers'],
    });
    if (!questions) {
      throw new NotFoundException(`Kategorie nicht gefunden`);
    }
    return questions;
  }

  async getQuestionById(id: number) {
    const question = await this.questionsRepositroy.findOne({
      where: { id: id },
    });
    if (!question) {
      throw new NotFoundException(`Question nicht gefunden`);
    }
    return question;
  }

  async createQuestion(
    description: string,
    answers: string[],
    correctAnswers: string[],
    category: number,
  ) {
    const question = new Question();
    question.description = description;
    question.answers = answers;
    question.correctAnswers = correctAnswers;
    question.category = category;

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
    if (!question) {
      throw new NotFoundException(`Question nicht gefunden`);
    }
    question.description = description;
    question.answers = answers;
    question.correctAnswers = correctAnswers;
    await this.questionsRepositroy.save(question);
  }

  async deleteQeustion(id: number) {
    const question = await this.questionsRepositroy.findOne({
      where: { id: id },
    });
    if (!question) {
      throw new NotFoundException(`Question nicht gefunden`);
    }
    await this.questionsRepositroy.remove(question);
  }
}

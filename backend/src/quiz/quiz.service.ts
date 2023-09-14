import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/entity/quiz.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  async getQuizByUserName(username: string): Promise<Quiz[]> {
    return await this.quizRepository.find({
      where: [{ username1: username }, { username2: username }],
    });
  }

  async createQuiz(
    username1: string,
    username2: string,
    winnerUsername: string,
  ): Promise<Quiz> {
    const quiz = new Quiz();
    quiz.username1 = username1;
    quiz.username2 = username2;
    quiz.winnerUsername = winnerUsername;

    return await this.quizRepository.save(quiz);
  }
}
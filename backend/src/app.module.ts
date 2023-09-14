import { Module } from '@nestjs/common';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.module';
import { GatewayModule } from './gateway/gateway.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend', 'dist', 'frontend'),
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db.sqlite',
      synchronize: true,
      entities: [`${__dirname}/entity/**/*.{js,ts}`],
    }),
    AuthModule,
    UsersModule,
    QuestionsModule,
    GatewayModule,
    QuizModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  Unique,
} from 'typeorm';

@Entity()
@ApiTags('Quiz')
export class Quiz {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Die eindeutige Quizduell ID' })
  id: number;

  @Column()
  @ApiProperty({ description: 'Der Username von Spieler 1' })
  username1: string;

  @Column()
  @ApiProperty({ description: 'Der Username von Spieler 2' })
  username2: string;

  /*  @Column()
  user1Id: number;

  @Column()
  user2Id: number;*/

  @Column()
  @ApiProperty({ description: 'Der Username von dem Gewinner' })
  winnerUsername: string;
}

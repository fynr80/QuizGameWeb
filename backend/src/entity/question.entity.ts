import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ApiTags('Fragen')
export class Question {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Die eindeutige Question ID' })
  id: number;

  @Column()
  @ApiProperty({ description: 'Die eigentliche Frage' })
  description: string;

  @Column({ default: 1 })
  @ApiProperty({ description: 'Die Kategorie Nummer' })
  category: number;

  @Column('simple-array', { default: '' })
  @ApiProperty({ description: 'Die möglichen Antworten' })
  answers: string[];

  @Column('simple-array', { default: '' })
  @ApiProperty({ description: 'Die richtige Antwort' })
  correctAnswers: string[];
}

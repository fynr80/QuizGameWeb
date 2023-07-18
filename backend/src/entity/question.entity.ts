import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column('simple-array', { default: '' })
  answers: string[];

  @Column('simple-array', { default: '' })
  correctAnswers: string[];
}

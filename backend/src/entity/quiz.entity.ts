import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  Unique,
} from 'typeorm';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username1: string;

  @Column()
  username2: string;

  @Column()
  winnerUsername: string;
}

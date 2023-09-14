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

  /*  @Column()
  user1Id: number;

  @Column()
  user2Id: number;*/

  @Column()
  winnerUsername: string;
}

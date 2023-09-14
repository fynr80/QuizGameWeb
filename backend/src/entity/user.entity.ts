import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  Unique,
} from 'typeorm';

export type UserRole = 'admin' | 'user';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @ManyToMany(() => User)
  @JoinTable()
  friends: User[];

  @ManyToMany(() => User)
  @JoinTable()
  friendRequests: User[];

  @Column({ default: 0 })
  gamesWon: number;

  @Column({ default: 0 })
  gamesLost: number;

  @Column({ default: 0 })
  gamesDraw: number;

  @Column('simple-array', { default: '' })
  history: string[];
}

import { ApiProperty, ApiTags } from '@nestjs/swagger';
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
@ApiTags('Benutzer')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Die eindeutige User ID' })
  id: number;

  @Column()
  @ApiProperty({ description: 'Der Username Benutzers' })
  username: string;

  @Column()
  @ApiProperty({ description: 'Das verschlüsselte Password Benutzers' })
  password: string;

  @Column({ default: 'user' })
  @ApiProperty({ description: 'Die Rolle des Benutzers' })
  role: string;

  @ManyToMany(() => User)
  @ApiProperty({ description: 'Die Freundesliste des Benutzers' })
  @JoinTable()
  friends: User[];

  @ManyToMany(() => User)
  @ApiProperty({ description: 'Die Freundschaftsanfragen des Benutzers' })
  @JoinTable({
    name: 'friendRequest',
    joinColumn: {
      name: 'to_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'from_id',
      referencedColumnName: 'id',
    },
  })
  friendRequests: User[];

  @Column({ default: 0 })
  @ApiProperty({ description: 'Anzahl Gewonnene Spiele' })
  gamesWon: number;

  @Column({ default: 0 })
  @ApiProperty({ description: 'Anzahl Verlorene Spiele' })
  gamesLost: number;

  @Column({ default: 0 })
  @ApiProperty({ description: 'Anzahl Unentschieden Spiele' })
  gamesDraw: number;

  @Column('simple-array', { default: '' })
  @ApiProperty({ description: 'History der vergangenen Spiele' })
  history: string[];
}

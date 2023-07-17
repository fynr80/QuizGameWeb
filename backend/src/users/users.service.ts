import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByName(name: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: {
        username: name,
      },
    });
  }

  async create(username: string, password: string) {
    const newUser = new User();
    newUser.username = username;
    newUser.password = password;
    newUser.role = 'user';
    newUser.friends = [];
    newUser.friendRequests = [];

    await this.userRepository.save(newUser);

    return {
      message: 'User succesfully registered',
    };
  }

  async deleteByName(name: string) {
    const user = await this.userRepository.findOne({
      where: {
        username: name,
      },
    });

    await this.userRepository.remove(user);

    return {
      message: 'User succesfully deleted',
    };
  }
}

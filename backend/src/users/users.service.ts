import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

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
    const userExists = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });

    if (userExists) {
      throw new BadRequestException('User creation failed', {
        cause: new Error(),
        description: 'User with the given name already exists',
      });
    }

    const newUser = new User();
    newUser.username = username;

    const hashedPassword = await bcrypt.hash(password, 10);

    newUser.password = hashedPassword;
    newUser.role = 'user';
    newUser.friends = [];
    newUser.friendRequests = [];
    newUser.gamesWon = 0;
    newUser.history = [];

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

  async addFriend(name: string, friendname: string) {
    const friend = await this.userRepository.findOne({
      where: {
        username: friendname,
      },
    });

    const user = await this.userRepository.findOne({
      where: {
        username: name,
      },
    });

    friend.friendRequests.push(user);

    await this.userRepository.save(friend);
  }

  async createAdmin() {
    const newUser = new User();
    newUser.username = 'admin';

    const hashedPassword = await bcrypt.hash('admin', 10);

    newUser.password = hashedPassword;
    newUser.role = 'admin';
    newUser.friends = [];
    newUser.friendRequests = [];
    newUser.gamesWon = 0;
    newUser.history = [];

    await this.userRepository.save(newUser);
  }
}

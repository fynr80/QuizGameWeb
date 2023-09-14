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

  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find({
      select: ['id', 'username'],
    });
  }
  async getAllFriends(id: number): Promise<User[]> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        friends: true,
      },
    });
    console.log(user.friends);
    return user.friends;
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
    newUser.gamesLost = 0;
    newUser.gamesDraw = 0;

    await this.userRepository.save(newUser);

    return {
      message: 'User succesfullsy registered',
    };
  }

  async updatePassword(newPassword: string, userName: string) {
    const user = await this.userRepository.findOne({
      where: {
        username: userName,
      },
    });
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await this.userRepository.save(user);
  }

  async updateGamesStatistic(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    user.gamesDraw = 0;
    user.gamesLost = 0;
    user.gamesWon = 0;
    await this.userRepository.save(user);
  }

  async increaseWinNumber(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    user.gamesWon++;
    await this.userRepository.save(user);
  }

  async increaseDrawNumber(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    user.gamesDraw++;
    await this.userRepository.save(user);
  }

  async increaseLostNumber(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    user.gamesLost++;
    await this.userRepository.save(user);
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

  async getRequests(id: number): Promise<User[]> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        friendRequests: true,
      },
    });

    return user.friendRequests;
  }

  async updateRequests(userId: number, friendId: number) {
    const friend = await this.userRepository.findOne({
      where: {
        id: friendId,
      },
    });
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        friendRequests: true,
      },
    });
    user.friendRequests = user.friendRequests.filter(
      (obj) => obj.id !== friend.id,
    );
    await this.userRepository.save(user);
    return {
      message: 'User succesfully deleted',
    };
  }

  async addFriend(userId: number, friendId: number): Promise<User> {
    const friend = await this.userRepository.findOne({
      where: {
        id: friendId,
      },
    });

    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!friend.friendRequests) {
      friend.friendRequests = [];
    }

    friend.friendRequests.push(user);

    return await this.userRepository.save(friend);
  }

  async addRealFriend(userId: number, friendId: number): Promise<User> {
    const friend = await this.userRepository.findOne({
      where: {
        id: friendId,
      },
    });

    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user.friends) {
      user.friends = [];
    }
    /*if (user.friends.indexOf(friend) === -1) {
      user.friends.push(friend);
    }*/
    user.friends.push(friend);
    console.log('friendADDED');
    return await this.userRepository.save(user);
  }

  async updateUsername(newUserName: string, id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    user.username = newUserName;

    await this.userRepository.save(user);
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

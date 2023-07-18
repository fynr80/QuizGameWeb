import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserResponse } from './local.strategy';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<UserResponse> {
    const user = await this.usersService.findByName(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async registerUser(username: string, pass: string) {
    if (!username || !pass) {
      throw new BadRequestException('Invalid credentials', {
        cause: new Error(),
        description: 'username or password cant be empty',
      });
    }
    await this.usersService.create(username, pass);
  }

  async deleteUser(username: string) {
    if (!username) {
      throw new BadRequestException('invalid credidantials', {
        cause: new Error(),
        description: 'username cant be empty',
      });
    }
    await this.usersService.deleteByName(username);
  }
}

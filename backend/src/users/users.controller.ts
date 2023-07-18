import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('addFriend')
  async addFriend(@Body('username') username, @Body('friendname') friendname) {
    this.userService.addFriend(username, friendname);
    return { msg: 'Friend request has been succesfully sent' };
  }

  @Post('invite')
  async invite() {
    return { msg: 'Duel challenge has been sent' };
  }

  @Get('statistic')
  async getStatistic() {
    return { msg: 'User statistic has been updated' };
  }

  @Post('statistic')
  async updateStatistic() {
    return { msg: 'User statistic has been updated' };
  }

  @Post('admin')
  async creaetAdmin() {
    await this.userService.createAdmin();
    return { msg: 'admin created' };
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/entity/user.entity';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Read all users
  @Get()
  async getAllUsers() {
    const result = await this.userService.getAllUsers();
    return { result };
  }

  // Update username
  @Put(':id')
  async updateUsername(@Param('id', ParseIntPipe) id: number, @Body() user) {
    this.userService.updateUsername(user.newUserName, id);
    return { msg: 'Username has been updated' };
  }

  // Create a new friend request to particular user
  @Post(':id/friend-requests')
  async addFriendRequest(
    @Param('id', ParseIntPipe) id: number,
    @Body('friendId') friendId,
  ) {
    await this.userService.addFriend(id, friendId);
    return { msg: 'Friend request has been succesfully sent.' };
  }

  // Get all friend requests for particular user
  @Get(':id/friend-requests')
  async getFriendRequests(@Param('id', ParseIntPipe) id: number) {
    const result = await this.userService.getRequests(id);
    return result;
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

  @Post('updatePassword')
  async updatePassword(@Body('password') password, @Body('userName') userName) {
    this.userService.updatePassword(password, userName);
    return { msg: 'Passport has been updated' };
  }

  /*@Get(':userId')
  async getFriends(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<User[]> {
    console.log('userIdD');
    console.log(userId);
    const result = await this.userService.getRequests(userId);

    return result;
  } */

  @Post('admin')
  async creaetAdmin() {
    await this.userService.createAdmin();
    return { msg: 'admin created' };
  }
}

import {
  Controller,
  Get,
  Post,
  Delete,
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

  // Read all friends
  @Get(':id/getFriends')
  async getAllFriends(@Param('id', ParseIntPipe) id: number) {
    const result = await this.userService.getAllFriends(id);

    return result;
  }

  // Read by Name
  @Get(':id') async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findById(id);
  }

  // Update username
  @Put(':id')
  async updateUsername(@Param('id', ParseIntPipe) id: number, @Body() user) {
    this.userService.updateUsername(user.newUserName, id);
    return { msg: 'Username has been updated' };
  }

  // Update winLoose
  @Put(':id/quiz-result')
  async updateWinLoose(@Param('id', ParseIntPipe) id: number, @Body() whoWin) {
    let whoWin1: number = whoWin.whoWin;

    if (whoWin1 == 1) {
      this.userService.increaseWinNumber(id);
    } else if (whoWin1 == 2) {
      console.log('verloren');

      this.userService.increaseLostNumber(id);
    } else {
      console.log('unentschieden');

      this.userService.increaseDrawNumber(id);
    }
    return { msg: 'User win Loose has been updated' };
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

  @Post(':id/add-new-friend')
  async addNewFriend(
    @Param('id', ParseIntPipe) id: number,
    @Body('friendId') friendId,
  ) {
    console.log('await this.userService.addRealFriend(id, friendId)');

    return await this.userService.addRealFriend(id, friendId);
  }

  @Put(':id/delete-friend')
  async deleteFriend(
    @Param('id', ParseIntPipe) id: number,
    @Body('friendId') friendId,
  ) {
    console.log('await this.userService.addRealFriend(id, friendId)');

    return await this.userService.deleteFriend(id, friendId);
  }

  // Get all friend requests for particular user
  @Get(':id/friend-requests')
  async getFriendRequests(@Param('id', ParseIntPipe) id: number) {
    const result = await this.userService.getRequests(id);
    return result;
  }

  @Put(':id/updateFriend-requests')
  async deleteFriendRequests(
    @Param('id', ParseIntPipe) id: number,
    @Body('friendId') friendId,
  ) {
    await this.userService.updateRequests(id, friendId);
    return { msg: 'Request successfully deleted' };
  }

  @Post('invite')
  async invite() {
    return { msg: 'Duel challenge has been sent' };
  }

  /*@Get('statistic')
  async getStatistic() {
    return { msg: 'User statistic has been updated' };
  }

  @Post('statistic')
  async updateStatistic() {
    return { msg: 'User statistic has been updated' };
  }*/

  @Post('updatePassword')
  async updatePassword(@Body('password') password, @Body('userName') userName) {
    this.userService.updatePassword(password, userName);
    return { msg: 'Passport has been updated' };
  }

  @Post('updateGamesStatistic')
  async updateGamesStatistic(@Body('userId') userId) {
    this.userService.updateGamesStatistic(userId);
    return { msg: 'User Games Statistic has been updated' };
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

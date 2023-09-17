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
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@Controller('api/users')
@ApiTags('Benutzer')
@ApiOkResponse({ description: 'Alles hat Funktioniert' })
@ApiInternalServerErrorResponse({
  description: 'Ein Fehler ist aufgetreten',
})
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Read all users
  @Get()
  @ApiOkResponse({ description: 'Alle Benutzer geholt' })
  async getAllUsers() {
    const result = await this.userService.getAllUsers();
    return { result };
  }

  // Read all friends
  @Get(':id/getFriends')
  @ApiParam({ name: 'id', description: 'Die ID des Benutzers' })
  @ApiOkResponse({ description: 'Freundesliste des Benutzer geholt' })
  @ApiInternalServerErrorResponse({
    description: 'Ein Fehler ist aufgetreten',
  })
  async getAllFriends(@Param('id', ParseIntPipe) id: number) {
    const result = await this.userService.getAllFriends(id);
    return result;
  }

  // Read by Name
  @Get(':id')
  @ApiParam({ name: 'id', description: 'Die ID des Benutzers' })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findById(id);
  }

  // Update username
  @Put(':id')
  @ApiParam({ name: 'id', description: 'Die ID des Benutzers' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          description: 'Der neue Benutzername',
        },
      },
    },
  })
  @ApiOkResponse({ description: 'Username wurde aktualisiert' })
  async updateUsername(@Param('id', ParseIntPipe) id: number, @Body() user) {
    const result = this.userService.updateUsername(user.newUserName, id);
    return result;
  }

  // Update winLoose
  @Put(':id/quiz-result')
  @ApiParam({ name: 'id', description: 'Die ID des Benutzers' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        whoWin: {
          type: 'string',
          description: 'Der Benutzername des Gewinners',
        },
      },
    },
  })
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
  @ApiParam({ name: 'id', description: 'Die ID des Benutzers' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        friendId: {
          type: 'string',
          description: 'Der Benutzername des Freundes',
        },
      },
    },
  })
  async addFriendRequest(
    @Param('id', ParseIntPipe) id: number,
    @Body('friendId') friendId,
  ) {
    await this.userService.addFriend(id, friendId);
    return { msg: 'Friend request has been succesfully sent.' };
  }

  @Post(':id/add-new-friend')
  @ApiParam({ name: 'id', description: 'Die ID des Benutzers' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        friendId: {
          type: 'string',
          description: 'Der Benutzername des Freundes',
        },
      },
    },
  })
  async addNewFriend(
    @Param('id', ParseIntPipe) id: number,
    @Body('friendId') friendId,
  ) {
    return await this.userService.addRealFriend(id, friendId);
  }

  @Put(':id/delete-friend')
  @ApiParam({ name: 'id', description: 'Die ID des Benutzers' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        friendId: {
          type: 'string',
          description: 'Der Benutzername des Freundes',
        },
      },
    },
  })
  async deleteFriend(
    @Param('id', ParseIntPipe) id: number,
    @Body('friendId') friendId,
  ) {
    console.log('await this.userService.addRealFriend(id, friendId)');

    return await this.userService.deleteFriend(id, friendId);
  }

  // Get all friend requests for particular user
  @Get(':id/friend-requests')
  @ApiParam({ name: 'id', description: 'Die ID des Benutzers' })
  async getFriendRequests(@Param('id', ParseIntPipe) id: number) {
    const result = await this.userService.getRequests(id);
    return result;
  }

  @Put(':id/updateFriend-requests')
  @ApiParam({ name: 'id', description: 'Die ID des Benutzers' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        friendId: {
          type: 'string',
          description: 'Der Benutzername des Freundes',
        },
      },
    },
  })
  async deleteFriendRequests(
    @Param('id', ParseIntPipe) id: number,
    @Body('friendId') friendId,
  ) {
    await this.userService.updateRequests(id, friendId);
    return { msg: 'Request successfully deleted' };
  }

  /*@Post('invite')
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
  }*/

  @Post('updatePassword')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userName: {
          type: 'string',
          description: 'Der Benutzer userName',
        },
        password: {
          type: 'string',
          description: 'Das neue Passwort',
        },
      },
    },
  })
  async updatePassword(@Body('password') password, @Body('userName') userName) {
    this.userService.updatePassword(password, userName);
    return { msg: 'Passport has been updated' };
  }

  @Post('updateGamesStatistic')
  @ApiParam({ name: 'id', description: 'Die ID des Benutzers' })
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
}

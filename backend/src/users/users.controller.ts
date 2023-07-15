import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('addFriend')
  addFriend(): string {
    return 'auth register';
  }

  @Get('invite')
  invite(): string {
    return 'auth login';
  }

  @Get('statistic')
  getStatistic(): string {
    return 'auth login';
  }

  @Post('statistic')
  upddateStatistic(): string {
    return 'auth login';
  }
}

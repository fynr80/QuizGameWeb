import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import { LocalAuthGuard } from './../guards/local-auth.guard';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('api/auth')
@ApiTags('Benutzer Auth')
@ApiOkResponse({ description: 'Alles hat Funktioniert' })
@ApiInternalServerErrorResponse({
  description: 'Ein Fehler ist aufgetreten',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          description: 'Der neue Benutzername',
        },
        password: {
          type: 'string',
          description: 'das passwort',
        },
      },
    },
  })
  async register(@Body('username') username, @Body('password') password) {
    return await this.authService.registerUser(username, password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  @Post('logout')
  async logout(@Request() req) {
    req.session.destroy();
    return { msg: 'Logged out succesfully' };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('getSession')
  async getSession(@Request() req) {
    return req.user;
  }

  @Post('delete')
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
  async delete(@Body('username') username) {
    await this.authService.deleteUser(username);
    return { msg: 'User succesfully deleted' };
  }
}

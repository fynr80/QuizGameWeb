import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthenticatedGuard } from './authenticated.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Request() req) {
    const { username, password } = req.body;
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
    return { msg: 'The user session has ended' };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('getSession')
  async getSession(@Request() req) {
    return req.user;
  }

  @Post('delete')
  async delete(@Request() req) {
    const { username } = req.body;

    await this.authService.deleteUser(username);
    return { msg: 'User succesfully deleted' };
  }
}

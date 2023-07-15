import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('resgister')
  register(): string {
    return 'auth register';
  }

  @Get('login')
  login(): string {
    return 'auth login';
  }
}

import { Body, Controller, Post, Query } from '@nestjs/common';
import { Public } from '../commons/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/logout')
  async logout(@Query('token') token) {
    return this.authService.logout(token);
  }
}

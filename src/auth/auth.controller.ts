import { Body, Controller, Param, Post, Query, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";


@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout(@Query('token') token) {
    return this.authService.logout(token);
  }
}

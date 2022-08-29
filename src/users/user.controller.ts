import { Body, Controller, Get, Param, Post, Query, UnauthorizedException, UseGuards } from "@nestjs/common";
import { UserCommand } from './user.command';
import { UserQuery } from './user.query';
import { UserRegisterDto } from './dto/user.register.dto';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { JwtService } from "@nestjs/jwt";
import { isString } from "class-validator";

@Controller('v1/user')
export class UserController {
  constructor(
    private userCommand: UserCommand,
    private userQuery: UserQuery,
    private jwtService: JwtService
  ) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  async registerUser(@Query('token') token, @Body() userRegisterDto: UserRegisterDto) {
    try {
      const payload = this.jwtService.decode(token)

      // TODO: check if token is valid formated
      if (payload['profile'] !== 'board') {
        throw new UnauthorizedException(`Unauthorized user`)
      }
    } catch (e) {
      throw new UnauthorizedException(`Unauthorized user`)
    }

    return this.userCommand.create(userRegisterDto);
  }

  @Get('/:username')
  async findByUsername(@Param('username') username: string) {
    return this.userQuery.getByUsername(username)
  }
}

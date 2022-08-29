import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { UserCommand } from './user.command';
import { UserQuery } from './user.query';
import { UserRegisterDto } from './dto/user.register.dto';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller()
export class UserController {
  constructor(
    private readonly userCommand: UserCommand,
    private readonly userQuery: UserQuery
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/v1/users')
  async registerUser(@Body() userRegisterDto: UserRegisterDto) {
    return this.userCommand.create(userRegisterDto);
  }

  @Get('/users/:username')
  async findByUsername(@Param('username') username: string) {
    return this.userQuery.getByUsername(username)
  }
}

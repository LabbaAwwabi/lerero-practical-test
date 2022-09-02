import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserCommand } from './user.command';
import { UserQuery } from './user.query';

@Controller('v1/user')
export class UserController {
  constructor(private userCommand: UserCommand, private userQuery: UserQuery) {}

  @Post()
  async registerUser(@Body() userRegisterDto: UserRegisterDto) {
    return this.userCommand.create(userRegisterDto);
  }

  @Get('/:username')
  async findByUsername(@Param('username') username: string) {
    return this.userQuery.getByUsername(username);
  }
}

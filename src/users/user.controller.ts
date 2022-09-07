import {
  Body,
  Controller,
  Get, Logger,
  Param,
  Post
} from "@nestjs/common";
import { UserRegisterDto } from './dto/user-register.dto';
import { UserCommand } from './user.command';
import { UserQuery } from './user.query';
import { Roles } from "../auth/role/roles.decorator";
import { Role } from "../auth/enums/role.enum";

@Controller('v1/user')
export class UserController {
  constructor(private userCommand: UserCommand, private userQuery: UserQuery) {}

  @Post()
  @Roles(Role.Board)
  async registerUser(@Body() userRegisterDto: UserRegisterDto) {
    return this.userCommand.create(userRegisterDto);
  }

  @Get('/:username')
  async findByUsername(@Param('username') username: string) {
    return this.userQuery.getByUsername(username);
  }
}

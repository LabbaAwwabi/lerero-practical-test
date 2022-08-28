import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserCommand } from './user.command';
import { UserQuery } from './user.query';
import { UserRegisterDto } from './dto/user.register.dto';
import { Roles } from "../roles/decorators/roles.decorator";
import { Role } from "../roles/enums/role.enum";

@Controller()
export class UserController {
  constructor(
    private readonly userCommand: UserCommand,
    private readonly userQuery: UserQuery
  ) {}

  @Post('/v1/user')
  @Roles(Role.Board)
  async registerUser(@Body() userRegisterDto: UserRegisterDto) {
    return this.userCommand.create(userRegisterDto);
  }

  @Get('/user/:username')
  async findByUsername(@Param('username') username: string) {
    return this.userQuery.getByUsername(username)
  }
}

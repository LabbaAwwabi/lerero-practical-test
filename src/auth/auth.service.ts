import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserQuery } from '../users/user.query';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private userQuery: UserQuery, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userQuery.getByUsername(username);

    // TODO: implement bcrypt
    if (!user || user.password !== pass) {
      throw new UnauthorizedException(`invalid login`);
    }

    delete user.password;

    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);

    const payload = {
      username: user.username,
      profile: user.profile,
      sub: user._id,
    };
    const token = this.jwtService.sign(payload);
    const profile = user.profile;

    return {
      token,
      profile,
    };
  }

  async logout(token: string) {
    // TODO: blacklist token

    return {
      message: `logout success`,
    };
  }
}

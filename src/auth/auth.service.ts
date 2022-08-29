import { Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserQuery } from '../users/user.query';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private userQuery: UserQuery,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
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

    const payload = { username: user.username, profile: user.profile, sub: user._id };

    return {
      token: this.jwtService.sign(payload),
      profile: user.profile,
    };
  }

  async logout(token: string) {
   // TODO: blacklist token

    return {
      message: `logout success`
    };
  }
}
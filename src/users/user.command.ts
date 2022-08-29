import { ForbiddenException, Injectable, NotAcceptableException } from "@nestjs/common";
import { User } from './schemas/user.schema';
import { UserRepository } from './user.repository';
import { UserRegisterDto } from './dto/user.register.dto';
import { v4 as uuidv4 } from 'uuid';
import mongoose from "mongoose";

@Injectable()
export class UserCommand {
  constructor(private readonly userRepository: UserRepository) {}

  async create(userRegisterDto: UserRegisterDto): Promise<User> {
    const user = await this.userRepository.findByUsername(userRegisterDto.username)

    if (user) {
      throw new NotAcceptableException(`User with username '${user.username}' already registered`);
    }

    return this.userRepository.create(userRegisterDto);
  }
}

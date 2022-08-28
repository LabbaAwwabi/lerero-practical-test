import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class UserQuery {
  constructor(private readonly userRepository: UserRepository) {}

  async getByUsername(username: string): Promise<User> {
    return this.userRepository.findByUsername(username);
  }

  async getByToken(token: string): Promise<User> {
    return this.userRepository.findByToken(token);
  }
}

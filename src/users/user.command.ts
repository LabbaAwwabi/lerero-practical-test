import {
  Injectable,
  NotAcceptableException,
  UnprocessableEntityException
} from "@nestjs/common";
import { User } from './schemas/user.schema';
import { UserRepository } from './user.repository';
import { UserRegisterDto } from './dto/user.register.dto';

@Injectable()
export class UserCommand {
  constructor(private readonly userRepository: UserRepository) {}

  async create(userRegisterDto: UserRegisterDto): Promise<User> {
    const user = await this.userRepository.findByUsername(userRegisterDto.username)

    if (user) {
      throw new NotAcceptableException(`User with username '${user.username}' already registered`);
    }

    try {
      return this.userRepository.create(userRegisterDto);
    } catch (e) {
      throw new UnprocessableEntityException(`Data cannot be processed`)
    }
  }
}

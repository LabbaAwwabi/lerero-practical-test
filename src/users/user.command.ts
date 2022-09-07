import {
  Injectable,
  NotAcceptableException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserRepository } from './user.repository';
import { UserRegisterDto } from './dto/user-register.dto';
import { SkillService } from "../skills/skill.service";
import { CreateSkillDto } from "../skills/dto/create-skill.dto";
import { UserUpdateSkillDto } from "./dto/user-update-skill.dto";

@Injectable()
export class UserCommand {
  constructor(
    private userRepository: UserRepository,
    private skillService: SkillService
  ) {}

  async create(userRegisterDto: UserRegisterDto): Promise<User> {
    const user = await this.userRepository.findByUsername(
      userRegisterDto.username,
    );

    if (user) {
      // throw new NotAcceptableException(
      //   `User with username '${user.username}' already registered`,
      // );
      throw new UnprocessableEntityException(`Data cannot be processed`);
    }

    try {
      // create skill if skill not exists
      for (const skillName of userRegisterDto.skill) {

        const skill = await this.skillService.findBySkillName(skillName);
        if (!skill) {
          const createSkillDto = new CreateSkillDto();
          createSkillDto.skillName = skillName;

          await this.skillService.create(createSkillDto);
        }
      }

      return this.userRepository.create(userRegisterDto);
    } catch (e) {
      throw new UnprocessableEntityException(`Data cannot be processed`);
    }
  }

  async update(userUpdateSkillDto: UserUpdateSkillDto) {
    return this.userRepository.update(userUpdateSkillDto);
  }
}

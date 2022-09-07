import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ActivityRepository } from "./activity.repository";
import { SkillService } from "../skills/skill.service";
import { CreateSkillDto } from "../skills/dto/create-skill.dto";
import { UserQuery } from "../users/user.query";
import { UserCommand } from "../users/user.command";
import { UserUpdateSkillDto } from "../users/dto/user-update-skill.dto";

@Injectable()
export class ActivityService {
  constructor(
    private acitivityRepository: ActivityRepository,
    private userQuery: UserQuery,
    private userCommand: UserCommand,
    private skillService: SkillService
  ) {}

  async create(createActivityDto: CreateActivityDto) {
    try {
      for (const participantName of createActivityDto.participants) {
        const participant = await this.userQuery.getByUsername(participantName);

        // check if participant is exists
        if (!participant) {
          throw new UnprocessableEntityException();
        }

        // add the skill if not listed
        if (!participant.skill.includes(createActivityDto.skill)) {
          participant.skill.push(createActivityDto.skill);

          const userUpdateDto = new UserUpdateSkillDto(participant.username);
          userUpdateDto.skill = participant.skill;

          await this.userCommand.update(userUpdateDto);
        }
      }

      const newActivity = await this.acitivityRepository.create(createActivityDto);

      const createSkillDto = new CreateSkillDto();
      createSkillDto.skillName = newActivity.skill;

      return await this.skillService.create(createSkillDto);
    } catch (e) {
      throw new UnprocessableEntityException(`Data cannot be processed`);
    }
  }

  async findBySkillID(skillID: string) {
    const skill = await this.skillService.findOne(skillID);

    if (!skill) {
      return
    }

    return await this.acitivityRepository.findBySkillName(skill.skillName);
  }

  findOne(id: number) {
    return `This action returns a #${id} activity`;
  }

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    return await this.acitivityRepository.update(id, updateActivityDto);
  }

  async remove(id: string) {
    return await this.acitivityRepository.delete(id);
  }
}

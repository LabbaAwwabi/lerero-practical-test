import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from "./schemas/activity.schema";
import { ActivityRepository } from "./activity.repository";

@Injectable()
export class ActivityService {
  constructor(private readonly acitivityRepository: ActivityRepository) {}

  async create(createActivityDto: CreateActivityDto) {
    try {
      return await this.acitivityRepository.create(createActivityDto);
    } catch (e) {
      throw new UnprocessableEntityException(`Data cannot be processed`);
    }
  }

  findAll() {
    return `This action returns all activities`;
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

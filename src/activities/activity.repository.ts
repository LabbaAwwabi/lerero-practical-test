import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity, ActivityDocument } from "./schemas/activity.schema";
import { CreateActivityDto } from "./dto/create-activity.dto";
import { UpdateActivityDto } from "./dto/update-activity.dto";

@Injectable()
export class ActivityRepository {
  constructor(@InjectModel(Activity.name) private activityModel: Model<ActivityDocument>) {}

  async create(createActivityDto: CreateActivityDto) {
    const newActivity = new this.activityModel(createActivityDto);
    return newActivity.save();
  }

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    const activity = await this.activityModel
      .findByIdAndUpdate({ _id: id }, updateActivityDto, { new: false })
      .populate('skill')
      .populate('title')
      .populate('description')
      .populate('startdate')
      .populate('enddate')
      .populate('participants');

    if (!activity) {
      throw new UnprocessableEntityException(`Data cannot be processed`);
    }
  }

  async delete(id: string) {
    try {
      await this.activityModel.deleteOne({ _id: id });
    } catch (e) {
      throw new UnprocessableEntityException(`Data cannot be processed`);
    }
  }

  async findByID(_id: string): Promise<Activity> {
    return this.activityModel.findOne({ _id });
  }
}

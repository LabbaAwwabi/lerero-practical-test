import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Skill, SkillDocument } from "./schema/skill.schema";

@Injectable()
export class SkillService {
  constructor(@InjectModel(Skill.name) private skillModel: Model<SkillDocument>) {}

  async create(createSkillDto: CreateSkillDto) {
    const skill = await this.findBySkillName(createSkillDto.skillName)
    if (skill) {
      return
    }

    const newSkill = new this.skillModel(createSkillDto);
    return newSkill.save();
  }

  async findAll() {
    return this.skillModel.find();
  }

  async findOne(id: string): Promise<Skill|null> {
    return this.skillModel.findOne({ _id: id});
  }

  async findBySkillName(skillName: string) {
    return this.skillModel.findOne({ skillName: skillName});
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRegisterDto } from './dto/user-register.dto';
import { User, UserDocument } from './schemas/user.schema';
import { UserUpdateSkillDto } from "./dto/user-update-skill.dto";

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userRegisterDto: UserRegisterDto) {
    const newUser = new this.userModel(userRegisterDto);
    return newUser.save();
  }

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username });
  }

  async findByToken(token: string): Promise<User> {
    return this.userModel.findOne({}).where('token').equals(token);
  }

  async update(userUpdateSkillDto: UserUpdateSkillDto) {
    console.log(userUpdateSkillDto);
    return this.userModel.findOneAndUpdate({ username: userUpdateSkillDto.username }, userUpdateSkillDto, { new: false })
      .populate('skill');
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UserRegisterDto } from "./dto/user.register.dto";
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userRegisterDto: UserRegisterDto): Promise<User> {
    const newUser = new this.userModel(userRegisterDto);
    return newUser.save();
  }

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username });
  }

  async findByToken(token: string): Promise<User> {
    return this.userModel.findOne({ }).where('token').equals(token);
  }
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserProfileType } from '../user.type';
import { Skill } from "../../skills/schema/skill.schema";
import mongoose from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
  })
  profile: UserProfileType;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
    required: false,
  })
  skill: Skill[];

  @Prop()
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserProfileType } from '../user.type';

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

  // @Prop({
  //   required: false,
  // })
  // skills: [];

  @Prop()
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

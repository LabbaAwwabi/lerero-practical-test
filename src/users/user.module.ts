import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './user.repository';
import { User, UserSchema } from './schemas/user.schema';
import { UserCommand } from './user.command';
import { UserQuery } from './user.query';
import { UserController } from './user.controller';
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../auth/constants";
import { SkillModule } from "../skills/skill.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    SkillModule,
  ],
  controllers: [UserController],
  providers: [UserCommand, UserQuery, UserRepository],
  exports: [UserCommand, UserQuery],
})
export class UserModule {}

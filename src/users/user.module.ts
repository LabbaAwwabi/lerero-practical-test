import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './user.repository';
import { User, UserSchema } from './schemas/user.schema';
import { UserCommand } from './user.command';
import { UserQuery } from './user.query';
import { UserController } from './user.controller';
import { AuthModule } from "../auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../auth/constants";

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
  ],
  controllers: [UserController],
  providers: [UserCommand, UserQuery, UserRepository],
  exports: [UserCommand, UserQuery],
})
export class UserModule {}

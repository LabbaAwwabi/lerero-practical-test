import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './user.repository';
import { User, UserSchema } from './schemas/user.schema';
import { UserCommand } from './user.command';
import { UserQuery } from './user.query';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserCommand, UserQuery, UserRepository],
  exports: [UserCommand, UserQuery],
})
export class UserModule {}

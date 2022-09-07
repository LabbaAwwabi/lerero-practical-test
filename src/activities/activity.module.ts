import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { ActivityRepository } from "./activity.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Activity, ActivitySchema } from "./schemas/activity.schema";
import { SkillModule } from "../skills/skill.module";
import { UserModule } from "../users/user.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Activity.name,
        schema: ActivitySchema,
      }
    ]),
    UserModule,
    SkillModule,
  ],
  controllers: [ActivityController],
  providers: [ActivityService, ActivityRepository],
  exports: [ActivityService]
})
export class ActivityModule {}

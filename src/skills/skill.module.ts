import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Skill, SkillSchema } from "./schema/skill.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Skill.name,
        schema: SkillSchema,
      }
    ])
  ],
  controllers: [SkillController],
  providers: [SkillService],
  exports: [SkillService]
})
export class SkillModule {}

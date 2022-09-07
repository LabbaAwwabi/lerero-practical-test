import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode } from "@nestjs/common";
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';

@Controller('v1/skills')
export class SkillController {
  constructor(private readonly skillsService: SkillService) {}

  @Post()
  @HttpCode(200)
  async create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }

  @Get()
  async findAll() {
    return this.skillsService.findAll();
  }

  @Get()
  async findOne(@Query('name') skillName: string) {
    return this.skillsService.findOne(skillName);
  }
}

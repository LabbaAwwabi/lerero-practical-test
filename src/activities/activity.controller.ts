import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from "@nestjs/common";
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Roles } from "../auth/role/roles.decorator";
import { Role } from "../auth/enums/role.enum";

@Controller('v1/activity')
export class ActivityController {
  constructor(private readonly activitiesService: ActivityService) {}

  @Post()
  @HttpCode(200)
  @Roles(Role.Expert)
  async create(@Body() createActivityDto: CreateActivityDto) {
    await this.activitiesService.create(createActivityDto);

    return "create success";
  }

  @Get()
  findAll() {
    return this.activitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activitiesService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {
    await this.activitiesService.update(id, updateActivityDto);

    return "update success";
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id') id: string) {
    await this.activitiesService.remove(id);

    return "update success";
  }
}

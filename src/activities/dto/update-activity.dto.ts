import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityDto } from './create-activity.dto';
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateActivityDto extends PartialType(CreateActivityDto) {
  @IsOptional()
  readonly skill: string;

  @IsOptional()
  readonly title: string;

  @IsOptional()
  readonly description: string;

  @IsOptional()
  @Transform( ({ value }) => new Date(value))
  @IsDate()
  readonly startdate: Date;

  @IsOptional()
  @Transform( ({ value }) => new Date(value))
  @IsDate()
  readonly enddate: Date;

  @IsOptional()
  readonly participants: string;
}

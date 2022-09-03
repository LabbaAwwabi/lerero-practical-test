import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Skill } from "../../skills/schema/skill.schema";

export class UserRegisterDto {
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly profile: string;

  @IsNotEmpty()
  readonly skill: Skill[];
}

import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  @IsString()
  readonly email: string;

  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly profile: string;
}

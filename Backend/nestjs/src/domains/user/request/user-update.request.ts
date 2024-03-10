import { AccountType, GenderType, Prisma } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { timeEponch } from 'src/shared/date.helper';

export class UserUpdateREQ {
  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  birth: string;

  @IsOptional()
  @IsEnum(GenderType)
  gender: GenderType;

  @IsOptional()
  @IsString()
  language: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  password: string;

  static toUpdateInput(body: UserUpdateREQ): Prisma.AuthenticatedUserUpdateInput {
    return {
      email: body.email,
      name: body.name,
      birth: timeEponch(body.birth),
      gender: body.gender,
      language: body.language,
      username: body.username,
      password: body.password,
    };
  }
}

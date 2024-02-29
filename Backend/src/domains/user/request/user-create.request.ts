import { AccountType, BackgroundKnowledgeType, GenderType, Prisma, QualificationType } from '@prisma/client';
import { IsArray, IsDate, IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UserCreateREQ {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEnum(GenderType)
  gender: GenderType;

  @IsDate()
  birth: Date;

  @IsNotEmpty()
  @IsString()
  language: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  refeshToken: string;

  @IsEnum(AccountType)
  accountType: AccountType;

  @IsArray()
  learningStyleQA: string[];

  @IsEnum(BackgroundKnowledgeType)
  backgroundKnowledge: BackgroundKnowledgeType;

  @IsEnum(QualificationType)
  qualification: QualificationType;

  static toCreateInput(body: UserCreateREQ): Prisma.AuthenticatedUserCreateInput {
    return {
      email: body.email,
      name: body.name,
      birth: body.birth.valueOf(),
      gender: body.gender ? body.gender : GenderType.UNKNOWN,
      language: body.language,
      lastLogin: new Date().valueOf(),
      lastLogout: new Date().valueOf(),
      password: body.password,
      username: body.username,
      refeshToken: body.refeshToken,
      accountType: body.accountType,
    };
  }
}

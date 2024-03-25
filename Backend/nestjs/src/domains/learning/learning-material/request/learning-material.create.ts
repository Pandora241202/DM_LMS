import { LearningMaterialType, Prisma } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { connectManyRelation, connectRelation } from 'src/shared/prisma.helper';

export class LearningMaterialCreateREQ {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  difficulty: number;

  @IsEnum(LearningMaterialType)
  type: LearningMaterialType;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  score: number;

  @IsOptional()
  @IsNumber()
  time: number; // calculate by seconds

  @IsNotEmpty()
  @IsNumber()
  topicId: number;

  static toCreateInput(body: LearningMaterialCreateREQ): Prisma.LearningMaterialCreateInput {
    return {
      name: body.name,
      difficulty: body.difficulty ? body.difficulty : 1.0,
      type: body.type,
      rating: body.rating ? body.rating : 5.0,
      score: body.score,
      time: body.time,
      topic: connectRelation(body.topicId),
    };
  }
}

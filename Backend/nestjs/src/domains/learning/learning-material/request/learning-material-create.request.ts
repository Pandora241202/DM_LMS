import { LearningMaterialType, Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { connectRelation } from 'src/shared/prisma.helper';

export class Quiz {
  duration: number;
  shuffle: boolean;
  questionaires: {
    question: string;
    choices: string[];
    correctAnswer: number;
  }[];
}

export class Code {
  question: string;
  inputId: number;
  outputId: number;
}

export class LearningMaterialCreateREQ {
  @IsNotEmpty()
  @IsNumber()
  creatorId: number;

  @IsOptional()
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

  @IsOptional()
  @IsNumber()
  fileId: number;

  @IsOptional()
  @Type(() => Quiz)
  quiz: Quiz;

  @IsOptional()
  @Type(() => Code)
  code: Code;

  static toCreateInput(body: LearningMaterialCreateREQ): Prisma.LearningMaterialCreateInput {
    return {
      name: body.name,
      difficulty: body.difficulty ? body.difficulty : 1.0,
      type: body.type,
      rating: body.rating ? body.rating : 5.0,
      score: body.score,
      time: body.time ? body.time : 300,
      Topic: connectRelation(body.topicId),
      Creator: connectRelation(body.creatorId),
    };
  }
}

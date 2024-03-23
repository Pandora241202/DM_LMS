import { Body } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { connectRelation } from 'src/shared/prisma.helper';

export class TopicCreateREQ {
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  postTopicIds: number[];

  static toCreateInput(body: TopicCreateREQ): Prisma.TopicCreateInput {
    return {
      title: body.title,
    };
  }
}

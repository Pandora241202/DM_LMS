import { Prisma, SubjectType } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class TopicCreateREQ {
  @IsString()
  title: string;

  @IsEnum(SubjectType)
  subject: SubjectType

  @IsOptional()
  @IsNumber({}, { each: true })
  postTopicIds: number[];


  static toCreateInput(body: TopicCreateREQ): Prisma.TopicCreateInput {
    return {
      title: body.title,
      subject: body.subject,
    };
  }
}

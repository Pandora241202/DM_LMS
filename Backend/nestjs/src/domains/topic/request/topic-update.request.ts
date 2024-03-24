import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { connectManyRelation, connectRelation } from 'src/shared/prisma.helper';

export class TopicUpdateREQ {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  lessonIds: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  lmIds: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  postIds: number[];

  static toCreateLink(topicId: number, body: TopicUpdateREQ): Prisma.TopicLinkCreateManyInput[] {
    return body.postIds.map((id) => ({ startId: topicId, endId: id,  }));
  }

  static toUpdateInput(body: TopicUpdateREQ): Prisma.TopicUpdateInput {
    return {
      title: body.title,
      Lesson: connectManyRelation(body.lessonIds),
      LearningMaterial: connectManyRelation(body.lmIds),
    };
  }
}

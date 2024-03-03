import { Prisma, Forum } from '@prisma/client';
import { ArrayNotEmpty, IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { DatetimeService } from 'src/service/datetime/datetime.service';

class ForumCreateRequestDto {

  @IsNotEmpty()
  @IsString()
  title: string;

  @ArrayNotEmpty()
  @IsString({ each: true })
  label: string[];

  @IsString()
  shortDescription: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsString()
  coverImage: string;

  @IsNotEmpty()
  @IsNumber()
  learnerId: number;

  static toCreateInput(data: ForumCreateRequestDto): Prisma.ForumUncheckedCreateInput {
    return {
      title: data.title,
      label: data.label,
      shortDescription: data.shortDescription,
      content: data.content,
      coverImage: data.coverImage,
      learnerId: data.learnerId,
    };
  }
}

class ForumCreateResponseDto {
  title: string;
  label: string[];
  shortDescription: string;
  content: string;
  coverImage: string;
  updated_at: string;
  created_at: string;

  static fromCreateOutput(data: Forum): ForumCreateResponseDto {
    return {
      title: data.title,
      label: data.label,
      shortDescription: data.shortDescription,
      content: data.content,
      coverImage: data.coverImage,
      updated_at: DatetimeService.formatVNTime(data.updated_at),
      created_at: DatetimeService.formatVNTime(data.created_at),
    };
  }
}

export {
  ForumCreateResponseDto,
  ForumCreateRequestDto,
}
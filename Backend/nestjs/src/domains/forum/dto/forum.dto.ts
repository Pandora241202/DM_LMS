import { Prisma, Forum } from '@prisma/client';
import { ArrayNotEmpty, IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { DatetimeService } from 'src/services/datetime/datetime.service';

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
  coverImage?: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  // Map from dto request to entity create input
  static toCreateInput(data: ForumCreateRequestDto): Prisma.ForumUncheckedCreateInput {
    return {
      ...data,
      readTimes: 0,
    };
  }
}

class ForumUpdateRequestDto {
  @IsString()
  title?: string;

  @IsString({ each: true })
  label?: string[];

  @IsString()
  shortDescription?: string;

  @IsString()
  content?: string;

  @IsString()
  coverImage?: string;

  @IsNumber()
  readTimes?: number;

  // Map from dto request to entity update input
  static toUpdateInput(data: ForumUpdateRequestDto): Prisma.ForumUncheckedUpdateInput {
    return data.readTimes == null
      ? {
          ...data,
          updatedAt: new Date(),
        }
      : {
          ...data,
        };
  }
}

class ForumResponseDto {
  id: number;
  title: string;
  label: string[];
  shortDescription: string;
  content: string;
  userId: number;
  coverImage: string;
  updatedAt: string;
  createdAt: string;

  // Map from Forum entity to dto
  static fromForum(data: Forum): ForumResponseDto {
    return {
      ...data,
      updatedAt: DatetimeService.formatVNTime(data.updatedAt),
      createdAt: DatetimeService.formatVNTime(data.createdAt),
    };
  }
}

export { ForumResponseDto, ForumCreateRequestDto, ForumUpdateRequestDto };

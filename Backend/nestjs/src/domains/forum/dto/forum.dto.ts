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

  // Map from dto request to entity update input
  static toUpdateInput(data: ForumUpdateRequestDto): Prisma.ForumUncheckedUpdateInput {
    return {
      ...data,
      updated_at: new Date(),
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
  updated_at: string;
  created_at: string;

  // Map from Forum entity to dto
  static fromForum(data: Forum): ForumResponseDto {
    return {
      ...data,
      updated_at: DatetimeService.formatVNTime(data.updated_at),
      created_at: DatetimeService.formatVNTime(data.created_at),
    };
  }
}

export { ForumResponseDto, ForumCreateRequestDto, ForumUpdateRequestDto };

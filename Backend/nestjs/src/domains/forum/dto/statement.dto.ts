import { Prisma, Statement } from '@prisma/client';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { DatetimeService } from 'src/service/datetime/datetime.service';

class StatementCreateRequestDto {

  @IsNumber()
  statementId?: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  forumId: number;

  @IsNotEmpty()
  @IsNumber()
  authenticatedUserId: number;

  // Map from dto request to entity create input
  static toCreateInput(data: StatementCreateRequestDto): Prisma.StatementUncheckedCreateInput {
    return {
      ...data
    };
  }
}

class StatementUpdateRequestDto {

  @IsString()
  content: string;

  // Map from dto request to entity update input
  static toUpdateInput(data: StatementUpdateRequestDto): Prisma.StatementUncheckedUpdateInput {
    return {
      ...data,
      updated_at: new Date(),
    };
  }
}

class StatementResponseDto {

  id: number;
  content: string;
  updated_at: string;
  authenticatedUserId: number;
  statementId: number;
  forumId: number;

  // Map from Forum entity to dto
  static fromForum(data: Statement): StatementResponseDto {
    return {
      ...data,
      updated_at: DatetimeService.formatVNTime(data.updated_at),
    };
  }
}

export {
  StatementResponseDto,
  StatementCreateRequestDto,
  StatementUpdateRequestDto,
}
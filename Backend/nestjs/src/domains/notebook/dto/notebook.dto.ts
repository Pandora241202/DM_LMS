import { Prisma, Notebook } from '@prisma/client';
import { IsNumber, IsNotEmpty, IsString, IsBoolean, IsArray, IsInt } from 'class-validator';
import { DatetimeService } from 'src/services/datetime/datetime.service';

class NotebookCreateRequestDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsBoolean()
  isPublic: boolean

  @IsArray()
  @IsString({ each: true })
  label?: string[];

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsArray()
  @IsInt({ each: true })
  modelIds: number[];

  @IsArray()
  @IsInt({ each: true })
  datasetIds: number[];

  // Map from dto request to entity create input
  static toCreateInput(data: NotebookCreateRequestDto): Prisma.NotebookUncheckedCreateInput {
    const {modelIds, datasetIds, ...rest} = data;
    return rest;
  }
}

//modelFile: File | Blob;

class NotebookUpdateRequestDto {
  @IsString()
  title?: string;

  @IsString()
  content?: string;

  @IsBoolean()
  isPublic?: boolean

  @IsArray()
  @IsString({ each: true })
  label?: string[];

  @IsArray()
  @IsInt({ each: true })
  modelIds?: number[];

  @IsArray()
  @IsInt({ each: true })
  datasetIds?: number[];

  @IsNumber()
  votes?: number

  // Map from dto request to entity update input
  static toUpdateInput(data: NotebookUpdateRequestDto): Prisma.NotebookUncheckedUpdateInput {
    const {modelIds, datasetIds, ...rest} = data;
    return {
      ...rest,
      updatedAt: new Date(),
    }
  }
}

class NotebookResponseDto {
  id: number;
  title: string;
  labels: string[];
  content?: string;
  userId: number;
  isPublic: boolean;
  updatedAt: string;
  models?: {modelId: number}[];
  datasets?: {datasetId: number}[];

  static fromNotebook(data: Notebook & {models?: {modelId: number}[]; datasets?: {datasetId: number}[];}): NotebookResponseDto {
    return {
      ...data,
      updatedAt: DatetimeService.formatVNTime(data.updatedAt),
    };
  }
}

export { NotebookResponseDto, NotebookCreateRequestDto, NotebookUpdateRequestDto };

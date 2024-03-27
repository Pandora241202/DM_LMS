import { BackgroundKnowledgeType, Prisma } from '@prisma/client';
import { CodeDTO, QuizDTO } from 'src/domains/learning/learning-material/dto/learning-material.dto';

export class CourseDTO {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  visibility: boolean;
  description: string;
  amountOfTime: number;
  level: BackgroundKnowledgeType;
  instructor: {
    id: number;
    name: string;
  };
  lessons: {
    id: number;
    title: string;
  }[];

  static selectFields(): Prisma.CourseSelect {
    return {
      id: true,
      createdAt: true,
      updatedAt: true,
      name: true,
      visibility: true,
      description: true,
      amountOfTime: true,
      level: true,
      Instructor: true,
      Lesson: true,
    };
  }

  static fromEnTity(entity: Prisma.CourseGetPayload<{ include: { Instructor: true; Lesson: true } }>): CourseDTO {
    const lessons = entity.Lesson.map((l) => ({ id: l.id, title: l.title }));

    return {
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      name: entity.name,
      visibility: entity.visibility,
      description: entity.description,
      amountOfTime: entity.amountOfTime,
      level: entity.level,
      instructor: {
        id: entity.Instructor.id,
        name: entity.Instructor.name,
      },
      lessons,
    };
  }
}

export class CourseListDTO {
  id: number;
  name: string;
  amountOfTime: number;
  createdAt: Date;
  updatedAt: Date;

  static fromEntity(entity: Prisma.CourseGetPayload<unknown>): CourseListDTO {
    return {
      id: entity.id,
      name: entity.name,
      amountOfTime: entity.amountOfTime,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
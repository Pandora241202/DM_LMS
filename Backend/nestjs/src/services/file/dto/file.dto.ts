import { Prisma } from '@prisma/client';

export class FileDTO {
  name: string;
  type: string;
  fileName: string;

  static fromEntity(entity: Prisma.FileGetPayload<unknown>): FileDTO {
    return {
      name: entity.name,
      fileName: entity.prefix + '--' + entity.name,
      type: entity.type,
    };
  }
}

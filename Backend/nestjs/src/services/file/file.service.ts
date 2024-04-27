import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FileService {
  constructor(private readonly prismaService: PrismaService) {}

  async upLoadFile(fileName: string, prefix: string, type: string) {
    const file = await this.prismaService.file.create({
      data: { name: fileName, prefix: prefix, type: type },
      select: { id: true },
    });
    return { id: file.id };
  }
}

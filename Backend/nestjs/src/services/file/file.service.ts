import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
  constructor(private readonly prismaService: PrismaService) {}

  async upLoadFile(fileName: string, prefix: string, type: string){
    await this.prismaService.file.create({ data: { name: fileName, prefix: prefix, type: type } });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FileDTO } from './dto/file.dto';

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

  async detail(id: number){
    const file = await this.prismaService.file.findFirst({where: { id }});
    if (!file) throw new NotFoundException("File not found")
    
    return FileDTO.fromEntity(file as any)
  }
}

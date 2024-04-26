import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { nanoid } from 'nanoid';
import { diskStorage } from 'multer';
import { Request } from 'express';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/materialFiles',
        filename: (req: Request, file, cb) => {
          const uniqueId = nanoid();
          const fileName = `${uniqueId}--${file.originalname}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  async create(@UploadedFile() file: Express.Multer.File) {
    const parts = file.filename.split('--');
    await this.fileService.upLoadFile(parts[1], parts[0], file.mimetype);
  }
}

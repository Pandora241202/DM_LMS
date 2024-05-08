import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
  NotFoundException,
  Put,
  UseGuards,
} from '@nestjs/common';
import { NotebookService } from './notebook.service';
import * as NotebookDto from './dto/notebook.dto';

//import { AuthGuard } from '../auth/auth.guard';

//@UseGuards(AuthGuard)
@Controller('notebook')
export class NotebookController {
  constructor(
    private readonly notebookService: NotebookService,
  ) {}

  @Post()
  async create(@Body() body: NotebookDto.NotebookCreateRequestDto) {
    try {
      const notebook = await this.notebookService.create(NotebookDto.NotebookCreateRequestDto.toCreateInput(body));
      const result = await this.notebookService.updateOne(notebook.id, {}, body.modelIds, body.datasetIds)
      return JSON.stringify(NotebookDto.NotebookResponseDto.fromNotebook(result));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Get()
  async getAll() {
    try {
      const result = await this.notebookService.getMany({ isPublic: true });
      return JSON.stringify(result.map((f) => NotebookDto.NotebookResponseDto.fromNotebook({...f, content: null})));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Get('user/:userId')
  async getAllUserOwned(@Param('userId', ParseIntPipe) userId: number) {
    try {
      const result = await this.notebookService.getMany({userId: userId});
      return JSON.stringify(result.map((f) => NotebookDto.NotebookResponseDto.fromNotebook({ ...f, content: null })));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.notebookService.getOne(id);
      if (result == null) {
        throw new NotFoundException(`Notebook with id ${id} not found`);
      }
      return JSON.stringify(NotebookDto.NotebookResponseDto.fromNotebook(result));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Put(':id')
  async updateOne(@Param('id', ParseIntPipe) id: number, @Body() body: NotebookDto.NotebookUpdateRequestDto) {
    try {
      const result = await this.notebookService.updateOne(id, NotebookDto.NotebookUpdateRequestDto.toUpdateInput(body), body.modelIds, body.datasetIds);
      if (result == null) {
        throw new NotFoundException(`Not found`);
      }
      return JSON.stringify(NotebookDto.NotebookResponseDto.fromNotebook(result));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

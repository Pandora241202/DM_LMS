import { Body, Controller, Post, Get, Param, ParseIntPipe, NotFoundException, Put, UseGuards } from '@nestjs/common';
import { ForumService } from './forum.service';
import { StatementService } from './statement.service';
import * as ForumDto from './dto/forum.dto';
import * as StatementDto from './dto/statement.dto';
//import { AuthGuard } from '../auth/auth.guard';

//@UseGuards(AuthGuard)
@Controller('forum')
export class ForumController {
  constructor(
    private readonly forumService: ForumService,
    private readonly statementService: StatementService,
  ) {}

  @Post()
  async create(@Body() body: ForumDto.ForumCreateRequestDto) {
    try {
      const result = await this.forumService.create(ForumDto.ForumCreateRequestDto.toCreateInput(body));
      return JSON.stringify(ForumDto.ForumResponseDto.fromForum(result));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Get()
  async getAll() {
    try {
      const result = await this.forumService.getAll();
      return JSON.stringify(result.map((f) => ForumDto.ForumResponseDto.fromForum({ ...f, content: '' })));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Get('user/:userId')
  async getAllUserOwned(@Param('userId', ParseIntPipe) userId: number) {
    try {
      const result = await this.forumService.getAllOwned(userId);
      return JSON.stringify(result.map((f) => ForumDto.ForumResponseDto.fromForum({ ...f, content: '' })));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.forumService.getOne(id);
      if (result == null) {
        throw new NotFoundException(`Forum with id ${id} not found`);
      }
      return JSON.stringify(ForumDto.ForumResponseDto.fromForum(result));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Put(':id')
  async updateOne(@Param('id', ParseIntPipe) id: number, @Body() body: ForumDto.ForumUpdateRequestDto) {
    try {
      const result = await this.forumService.updateOne(id, ForumDto.ForumUpdateRequestDto.toUpdateInput(body));
      if (result == null) {
        throw new NotFoundException(`Forum with id ${id} not found`);
      }
      return JSON.stringify(ForumDto.ForumResponseDto.fromForum(result));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Post('comment')
  async addComment(@Body() body: StatementDto.StatementCreateRequestDto) {
    try {
      if (body.statementId) {
        // Check if preComment exist
        const comment = await this.statementService.getOne(body.statementId);
        if (comment == null) {
          throw new NotFoundException(`Statement with id ${body.statementId} not found`);
        }
        // Check preComment in forum
        if (comment.forumId != body.forumId) {
          throw new NotFoundException(`Statement with id ${body.statementId} not found in forum ${body.forumId}`);
        }
      }
      const result = await this.statementService.create(StatementDto.StatementCreateRequestDto.toCreateInput(body));
      return JSON.stringify(StatementDto.StatementResponseDto.fromForum(result));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Get(':forumId/comment')
  async getCommentsOfForum(@Param('forumId', ParseIntPipe) forumId: number) {
    try {
      // Check if forum exists
      const forum = await this.forumService.getOne(forumId);
      if (forum == null) {
        throw new NotFoundException(`Forum with id ${forumId} not found`);
      }

      const result = await this.statementService.getAllInForum(forumId);
      return JSON.stringify(result.map((c) => StatementDto.StatementResponseDto.fromForum(c)));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Put('comment/:id')
  async updateComment(@Param('id', ParseIntPipe) id: number, @Body() body: StatementDto.StatementUpdateRequestDto) {
    try {
      const result = await this.statementService.updateOne(id, StatementDto.StatementUpdateRequestDto.toUpdateInput(body));
      if (result == null) {
        throw new NotFoundException(`Statement with id ${id} not found`);
      }
      return JSON.stringify(StatementDto.StatementResponseDto.fromForum(result));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

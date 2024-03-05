import { Body, Controller, Post, Get, Param, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { ForumService } from './forum.service';
import * as ForumDto from './dto/forum.dto';

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post()
  async create(@Body() body: ForumDto.ForumCreateRequestDto) {
    try {
      // Check if user exists
      /* 
      const user = await userService.getOne(userId);
      if (user == null) {
        throw new NotFoundException(`User not found`);
      } */
      
      const result = await this.forumService.create(ForumDto.ForumCreateRequestDto.toCreateInput(body));
      return JSON.stringify(ForumDto.ForumResponseDto.fromForum(result));
    }
    catch (error) {
      console.log(error);
      throw error;
    }    
  }

  @Get()
  async getAll() {
    try {
      const result = await this.forumService.getAll();
      return JSON.stringify(result.map(f => ForumDto.ForumResponseDto.fromForum({...f, content: ''})));
    }
    catch (error) {
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
    }
    catch (error) {
      console.log(error);
      throw error;
    }    
  }

  @Get('user/:userId')
  async getAllUserOwned(@Param('userId', ParseIntPipe) userId: number) {
    try {
      // Check if user exists
      /* 
      const user = await userService.getOne(userId);
      if (user == null) {
        throw new NotFoundException(`User not found`);
      } */

      const result = await this.forumService.getAllOwned(userId);
      return JSON.stringify(result.map(f => ForumDto.ForumResponseDto.fromForum({...f, content: ''})));
    }
    catch (error) {
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
    }
    catch (error) {
      console.log(error);
      throw error;
    }    
  }
}

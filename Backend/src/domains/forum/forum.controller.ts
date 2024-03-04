import { Body, Controller, Post } from '@nestjs/common';
import { ForumService } from './forum.service';
import * as ForumDto from './dto/forum.dto';

@Controller('forum')
export class ForumController {
    constructor(private readonly forumService: ForumService) {}

    @Post()
    async create(@Body() body: ForumDto.ForumCreateRequestDto) {
      try {
        const result = await this.forumService.create(ForumDto.ForumCreateRequestDto.toCreateInput(body));
        return JSON.stringify(ForumDto.ForumCreateResponseDto.fromCreateOutput(result));
      }
      catch (error) {
        console.log(error);
        throw error;
      }    
    }
}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicCreateREQ } from './request/topic-create.request';
import { TopicUpdateREQ } from './request/topic-update.request';
import { TopicLinkDeleteREQ } from './request/topic-link-delete.request';

@Controller('topics')
export class TopicController {
  constructor(public readonly topicService: TopicService) {}

  @Post()
  async create(@Body() body: TopicCreateREQ) {
    await this.topicService.create(body);
  }

  @Get()
  async detail(@Param('id', ParseIntPipe) id: number) {
    await this.topicService.detail(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: TopicUpdateREQ) {
    await this.topicService.update(id, body);
  }

  @Delete(':id/topic-links')
  async disactiveLink(@Param('id', ParseIntPipe) id: number, @Body() body: TopicLinkDeleteREQ) {
    await this.topicService.disactiveLink(id, body);
  }
}

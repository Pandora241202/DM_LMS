import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Req, Response, UseGuards } from '@nestjs/common';
import { LearnerLogService } from './learner-log.service';
import { AuthGuard } from 'src/domains/auth/auth.guard';
import { LearnerLogCreateREQ } from './request/learner-log-create.request';
import { response } from 'express';

@UseGuards(AuthGuard)
@Controller('learner-logs')
export class LearnerLogController {
  constructor(private readonly learnerLogService: LearnerLogService) {}

  @Post('batch')
  async createBatch( @Body() body: LearnerLogCreateREQ[]) {
    await this.learnerLogService.createBatch(body);
  }

  @Post(':learnerId')
  async create(@Param('learnerId', ParseIntPipe) learnerId: number, @Body() body: LearnerLogCreateREQ) {
    console.log(body)
    await this.learnerLogService.create(learnerId, body);
  }

  @Get(':learnerId')
  async detail(@Param('learnerId', ParseIntPipe) learnerId: number) {
    return await this.learnerLogService.detail(learnerId);
  }
}

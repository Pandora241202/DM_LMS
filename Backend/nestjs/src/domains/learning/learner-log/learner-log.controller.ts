import { Body, Controller, HttpStatus, Post, Req, Response, UseGuards } from '@nestjs/common';
import { LearnerLogService } from './learner-log.service';
import { AuthGuard } from 'src/domains/auth/auth.guard';
import { LearnerLogCreateREQ } from './request/learner-log-create.request';
import { response } from 'express';

@UseGuards(AuthGuard)
@Controller('learner-logs')
export class LearnerLogController {
  constructor(private readonly learnerLogService: LearnerLogService) {}

  @Post()
  async create(@Req() req: any, @Body() body: LearnerLogCreateREQ) {
    await this.learnerLogService.create(req.user.id, body);
  }

  @Post('batch')
  async createBatch(@Req() req: any, @Body() body: LearnerLogCreateREQ[]) {
    await this.learnerLogService.createBatch(req.user.id, body);
  }
}

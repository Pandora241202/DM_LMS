import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateREQ } from './request/user-create.request';
import { PaginationREQ } from 'src/shared/pagination.request';
import { UserUpdateREQ } from './request/user-update.request';
import { AuthGuard } from '../auth/auth.guard';
import { SubjectType } from '@prisma/client';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: UserCreateREQ) {
    await this.userService.create(body);
  }

  @Post('batch')
  async createBatch(@Body() body: UserCreateREQ[]) {
    await this.userService.createBatch(body);
  }

  @Get()
  async findAll(@Query() query: PaginationREQ) {
    return await this.userService.findAll(query);
  }

  @Get('base-information')
  async getBaseInfo(@Req() req: any) {
    return await this.userService.getBaseInfo(req.user.learnerId);
  }

  @Get('profile')
  async profile(@Req() req: any) {
    return req.user;
  }

  @Put('learning-style')
  async updateStyle(@Req() req: any, @Body() body: { learningStyleQA: string[] }) {
    return await this.userService.updateStyle(req.user.id, body.learningStyleQA);
  }

  @Get(':id')
  async detail(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.detail(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UserUpdateREQ) {
    return await this.userService.update(id, body);
  }
}

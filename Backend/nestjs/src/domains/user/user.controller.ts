import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateREQ } from './request/user-create.request';
import { PaginationREQ } from 'src/shared/pagination.request';
import { UserUpdateREQ } from './request/user-update.request';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: UserCreateREQ) {
    await this.userService.create(body);
  }

  @Get()
  async findAll(@Query() query: PaginationREQ) {
    return await this.userService.findAll(query);
  }

  @Get('generate-paths')
  async generatePaths(@Req() req: any, @Query() query: {start: number, end: number}) {
    return await this.userService.generatePaths(req.user.id, query.start, query.end);
  }

  @Get('profile')
  async profile(@Req() req: any) {
    return req.user;
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

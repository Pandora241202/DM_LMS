import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateREQ } from './request/user-create.request';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: UserCreateREQ) {
    await this.userService.create(body);
  }

  @Get(':id')
  async detail(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.detail(id);
  }
}

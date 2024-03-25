import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { AuthLoginREQ } from './request/auth-login.request';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthLoginRESP } from './response/auth-login.response';
import { AuthDTO } from './dto/auth.dto';
import { AccountType } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(body: AuthLoginREQ) {
    const user = await this.prismaService.authenticatedUser.findFirst({
      where: { username: body.username },
    });
    if (!user) {
      throw new UnauthorizedException('Username or password incorrect');
    }
    const learner = await this.prismaService.learner.findFirst({ where: { userId: user.id } });

    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Username or password incorrect');

    const jwtToken = await this.jwtService.signAsync({ user: AuthDTO.fromEntity(user as any, learner ? learner.id : null) });
    return AuthLoginRESP.fromEntity(user as any, jwtToken, learner ? learner.id : null);
  }
}

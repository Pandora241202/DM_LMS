import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { AuthLoginREQ } from './request/auth-login.request';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthLoginRESP } from './response/auth-login.response';
import { AuthDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(body: AuthLoginREQ) {
    const user = await this.prismaService.authenticatedUser.findFirst({
      where: { username: body.username },
      select: { id: true, password: true, username: true, accountType: true },
    });

    if (!user) {
      throw new UnauthorizedException("Sai tên đăng nhập hoặc mật khẩu");
    }
    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) throw new UnauthorizedException("Sai tên đăng nhập hoặc mật khẩu");

    const jwtToken = await this.jwtService.signAsync({ user: AuthDTO.fromEntity(user as any) });
    return AuthLoginRESP.fromEntity(user as any, jwtToken);
  }
}

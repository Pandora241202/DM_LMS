import { Prisma } from '@prisma/client';

export class AuthLoginRESP {
  username: string;
  accessToken: string;

  static fromEntity(e: Prisma.AuthenticatedUserGetPayload<unknown>, jwtToken: string): AuthLoginRESP {
    return {
      username: e.username,
      accessToken: jwtToken,
    };
  }
}

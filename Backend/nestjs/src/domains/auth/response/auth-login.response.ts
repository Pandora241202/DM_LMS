import { Prisma } from '@prisma/client';

export class AuthLoginRESP {
  id: number;
  username: string;
  accessToken: string;
  learnerId: null | number;

  static fromEntity(e: Prisma.AuthenticatedUserGetPayload<unknown>, jwtToken: string, learnerId: null | number): AuthLoginRESP {
    return {
      id: e.id,
      username: e.username,
      accessToken: jwtToken,
      learnerId: learnerId,
    };
  }
}

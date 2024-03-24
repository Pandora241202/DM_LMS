import { AccountType, Prisma } from '@prisma/client';

export class AuthDTO {
  id: number;
  username: string;
  learnerId: number;
  accountType: AccountType;

  static fromEntity(e: Prisma.AuthenticatedUserGetPayload<unknown>, learnerId: number) {
    return {
      id: e.id,
      username: e.username,
      learnerId: learnerId,
      accountType: e.accountType,
    };
  }
}

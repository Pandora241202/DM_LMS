import { AccountType, Prisma } from '@prisma/client';

export class AuthDTO {
  username: string;
  accountType: AccountType;

  static fromEntity(e: Prisma.AuthenticatedUserGetPayload<unknown>) {
    return {
      username: e.username,
      accountType: e.accountType,
    };
  }
}

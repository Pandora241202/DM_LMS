import { AccountType, GenderType, Prisma } from '@prisma/client';
import { parseEponch } from 'src/shared/date.helper';

export class UserInfoDTO {
  id: number;
  email: string;
  name: string;
  birth: bigint;
  gender: GenderType;
  language: string;
  username: string;
  state: boolean;
  accountType: AccountType;

  static selectUser(): Prisma.AuthenticatedUserSelect {
    return {
      id: true,
      email: true,
      name: true,
      birth: true,
      gender: true,
      language: true,
      username: true,
      state: true,
      accountType: true,
    };
  }

  static fromEntity(e: Prisma.AuthenticatedUserGetPayload<unknown>) {
    return {
      id: e.id,
      email: e.email,
      name: e.name,
      birth: parseEponch(Date.now()).year - parseEponch(e.birth).year,
      gender: e.gender,
      language: e.language,
      username: e.username,
      state: e.state,
      accountType: e.accountType,
    };
  }
}

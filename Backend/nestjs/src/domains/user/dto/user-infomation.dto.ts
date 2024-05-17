import { AccountType, GenderType, Prisma } from '@prisma/client';
import { parseEponch } from 'src/shared/date.helper';
import { leanObject } from 'src/shared/prisma.helper';

export class UserInfoDTO {
  id: number;
  email: string;
  age: bigint;
  gender: GenderType;
  language: string;
  name: string;
  username: string;
  state: boolean;
  accountType: AccountType;

  static selectUser(): Prisma.AuthenticatedUserSelect {
    return {
      id: true,
      avatar: true,
      name: true,
      email: true,
      birth: true,
      gender: true,
      language: true,
      username: true,
      state: true,
      accountType: true,
    };
  }

  static fromEntity(e: Prisma.AuthenticatedUserGetPayload<{include: {Course: true}}>, registerCourseIds?: number[]) {
    const courseIds = e.Course ? e.Course.map(c => c.id) : []
    return leanObject({
      id: e.id,
      avatar: e.avatar,
      email: e.email,
      name: e.name,
      age: parseEponch(Date.now()).year - parseEponch(e.birth).year,
      gender: e.gender,
      language: e.language,
      username: e.username,
      state: e.state,
      accountType: e.accountType,
      createdCourseIds: courseIds,
      registerCourseIds: registerCourseIds ? registerCourseIds : null,
    });
  }
}

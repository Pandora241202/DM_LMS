import { Prisma } from '@prisma/client';

export class TopicDetailRESP {
  title: string;
  postTopic: {
    id: number;
    title: string;
  }[];

  static fromEntity(e: Prisma.TopicGetPayload<{ include: { EndLink: { include: { end: true } } } }>) {
    return {
      title: e.title,
      postTopic: e.EndLink.map((link) => ({ id: link.end.id, title: link.end.title })),
    };
  }
}

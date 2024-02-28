import { deepCopy } from '../../utils/deep-copy';
import { forumDetail, forums } from './data';

class ForumApi {
  getForums(request) {
    return Promise.resolve(deepCopy(forums));
  }

  getForumDetail(request) {
    return Promise.resolve(deepCopy(forumDetail));
  }
}

export const forumApi = new ForumApi();

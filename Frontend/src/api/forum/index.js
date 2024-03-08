import { deepCopy } from '../../utils/deep-copy';
import { forumDetail, forums } from './data';
import axios from 'axios';

const apiUrl = 'http://localhost:8080/forum';

class ForumApi {
  getForums(request) {
    /*return axios.get(
      `https://famous-quotes4.p.rapidapi.com/random`
    );*/
    return Promise.resolve(deepCopy(forums));
  }

  getForumDetail(request) {
    return Promise.resolve(deepCopy(forumDetail));
  }

  postForum(request) {
    return axios.post(apiUrl, request)
  }
}

export const forumApi = new ForumApi();

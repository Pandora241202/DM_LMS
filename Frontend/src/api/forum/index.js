import { deepCopy } from '../../utils/deep-copy';
import { forumDetail, forums } from './data';
import axios from 'axios';

const apiUrl = 'http://localhost:8080/forum';

class ForumApi {
  getForums() {
    return axios.get(apiUrl);
    //return Promise.resolve(deepCopy(forums));
  }

  getForumDetail(id) {
    return axios.get(`${apiUrl}/${id}`);
    //return Promise.resolve(deepCopy(forumDetail));
  }

  postForum(request) {
    return axios.post(apiUrl, request)
  }

  getComments(id) {
    return axios.get(`${apiUrl}/${id}/comment`);
  }
}

export const forumApi = new ForumApi();

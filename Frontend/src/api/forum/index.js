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

  getSimilarForumS(request) {
    return axios.post(`${apiUrl}/similarForums`, request)
  }

  postForum(request) {
    return axios.post(apiUrl, request)
  }

  getComments(id) {
    return axios.get(`${apiUrl}/${id}/comment`);
  }

  postComment(request) {
    return axios.post(`${apiUrl}/comment`, request)
  }
}

export const forumApi = new ForumApi();

import axios from 'axios';

const apiUrl = 'http://localhost:8080';

class Topic_ManageApi {
  getListTopic() {
    return axios.get(`${apiUrl}/topics`);
    //return Promise.resolve(deepCopy(forums));
  }

//   getForumDetail(id) {
//     return axios.get(`${apiUrl}/${id}`);
//     //return Promise.resolve(deepCopy(forumDetail));
//   }

//   getSimilarForumS(request) {
//     return axios.post(`${apiUrl}/similarForums`, request)
//   }

//   postForum(request) {
//     return axios.post(apiUrl, request)
//   }

//   getComments(id) {
//     return axios.get(`${apiUrl}/${id}/comment`);
//   }

//   postComment(request) {
//     return axios.post(`${apiUrl}/comment`, request)
//   }
}

export const topic_manageApi = new Topic_ManageApi();

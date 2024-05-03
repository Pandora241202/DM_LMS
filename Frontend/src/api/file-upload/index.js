import axios from 'axios';

const apiUrl = 'http://localhost:8080';

class UploadFileApi {
  createFile(request) {
    return axios.post(`${apiUrl}/files`, request)
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

export const uploadFileApi = new UploadFileApi();

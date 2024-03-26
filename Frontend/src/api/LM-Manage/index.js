// import { deepCopy } from '../../utils/deep-copy';
// import { forumDetail, forums } from './data';
import axios from 'axios';

const apiUrl = 'http://localhost:8080/learning-materials';

class LM_ManageApi {
  createLM(request) {
    return axios.post(apiUrl, request);
    //return Promise.resolve(deepCopy(forums));
  }

  getLMs() {
    return axios.get(apiUrl);
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
}

export const lm_manageApi = new LM_ManageApi();
// import { deepCopy } from '../../utils/deep-copy';
// import { forumDetail, forums } from './data';
import axios from 'axios';

const apiUrl = 'http://localhost:8080/learner-logs';

class Learning_logApi {
  createLog(userId, request) {
    return axios.post(`${apiUrl}/${userId}`, request);
    //return Promise.resolve(deepCopy(forums));
  }

  getLog(userId) {
    return axios.get(`${apiUrl}/${userId}`);
    //return Promise.resolve(deepCopy(forums));
  }

}

export const learning_logApi = new Learning_logApi();
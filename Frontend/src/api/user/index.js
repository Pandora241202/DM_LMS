import { deepCopy } from '../../utils/deep-copy';
import { user } from './data';
import axios from 'axios';

const apiUrl = 'http://localhost:8080/user';

class UserApi {
  getUser(id) {
    /*return axios.get(`apiUrl/${id}`);*/
    return Promise.resolve(deepCopy(user));
  }
}

export const userApi = new UserApi();

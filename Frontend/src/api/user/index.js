import axios from 'axios';

const apiUrl = 'http://localhost:8080/users';

class UserApi {
  getUser(id) {
    return axios.get(`${apiUrl}/${id}`);
  }
}

export const userApi = new UserApi();

import axios from 'axios';

const apiUrl = 'http://localhost:8080/users';


class UserApi {
  getUser(id) {
    return axios.get(`${apiUrl}/${id}`);
  }

  getUserCourses(id) {
    return axios.get(`${apiUrl}/${id}/courses`);
  }

  getBaseInfo(userId) {
    return axios.get(`${apiUrl}/base-information/${userId}`);
  }
}

export const userApi = new UserApi();

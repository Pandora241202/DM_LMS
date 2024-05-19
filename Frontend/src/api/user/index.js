import axios from 'axios';

const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_API}/users`;


class UserApi {
  getUser(id) {
    return axios.get(`${apiUrl}/${id}`);
  }

  getUserCourses(id, take) {
    console.log(process.env.NEXT_PUBLIC_SERVER_API)
    const url = take ? `${apiUrl}/${id}/courses?take=${take}` : `${apiUrl}/${id}/courses`
    return axios.get(url);
  }

  getBaseInfo(userId) {
    return axios.get(`${apiUrl}/base-information/${userId}`);
  }

  registerCourse(userId, courseId) {
    return axios.post(`${apiUrl}/${userId}/courses`, {courseId});
  }
}

export const userApi = new UserApi();

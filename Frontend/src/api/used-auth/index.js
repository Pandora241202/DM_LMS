import axios from 'axios';

const apiUrl = 'http://localhost:8080';

class AuthApi {
  signIn(request) {
    const { username, password } = request;

    return axios.post(`${apiUrl}/login`, {
      "username": username,
      "password": password
    });
  }

  async signUp(request) {
    return axios.post(apiUrl, request)
  }

  me(id) {
    return axios.get(`${apiUrl}/users/${id}`)
  }
}

export const authApi = new AuthApi();

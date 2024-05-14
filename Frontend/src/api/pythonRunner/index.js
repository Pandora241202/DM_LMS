import axios from 'axios';

const apiUrl = 'http://localhost:8080/pythonRunner';

class PythonRunnerApi {
  postpythonRunner(request) {
    return axios.post(apiUrl, request)
  }
}

export const pythonRunnerApi = new PythonRunnerApi();

import axios from 'axios';

const apiUrl = `${process.env.SERVER_API}/pythonRunner`;

class PythonRunnerApi {
  postpythonRunner(request) {
    return axios.post(apiUrl, request)
  }
}

export const pythonRunnerApi = new PythonRunnerApi();

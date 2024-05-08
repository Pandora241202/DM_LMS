import axios from 'axios';

const apiUrl = 'http://localhost:8080/model';

class ModelApi {
  getModels() {
    return axios.get(apiUrl);
    //return Promise.resolve(deepCopy(forums));
  }

  getModelDetail(id) {
    return axios.get(`${apiUrl}/${id}`);
    //return Promise.resolve(deepCopy(forumDetail));
  }

  postModel(request) {
    return axios.post(apiUrl, request)
  }

  postModelVariation(request) {
    return axios.post('http://localhost:8080/modelVariation', request)
  }

  putModel(id, request) {
    return axios.put(`${apiUrl}/${id}`, request);
  }
}

export const modelApi = new ModelApi();

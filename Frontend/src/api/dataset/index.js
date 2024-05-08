import axios from 'axios';

const apiUrl = 'http://localhost:8080/dataset';

class DatasetApi {
  getDatasets() {
    return axios.get(apiUrl);
  }

  getDatasetDetail(id) {
    return axios.get(`${apiUrl}/${id}`);
    //return Promise.resolve(deepCopy(forumDetail));
  }

  postDataset(request) {
    return axios.post(apiUrl, request)
  }

  putDataset(id, request) {
    return axios.put(`${apiUrl}/${id}`, request);
  }
}

export const datasetApi = new DatasetApi();

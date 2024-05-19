import axios from 'axios';

const apiUrl = `http://localhost:8080/analytics`;

class AnalyticsApi {
  getHistoryUser(id){
    return axios.get(`${apiUrl}/history-user`);
  }

  getHistoryLog(id){
    return axios.get(`${apiUrl}/history-log`);
  }

  getHistoryForum(id){
    return axios.get(`${apiUrl}/history-forum`);
  }
}

export const analyticsApi = new AnalyticsApi
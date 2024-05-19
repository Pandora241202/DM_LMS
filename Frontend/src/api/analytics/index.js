import axios from 'axios';

const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_API}/analytics`;

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
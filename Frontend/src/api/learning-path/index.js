import axios from 'axios';

const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_API}/learning-path`;

class LearningPathApi {
  getLearningPath(learnerId) {
    return axios.get(`${apiUrl}/${learnerId}`);
  }

  createLearningPath(learnerId, request) {
    return axios.post(`${apiUrl}/${learnerId}`, request);
  }

  getRecommendedLearningPaths(learnerId, request) {
    return axios.post(`${apiUrl}/recommended/${learnerId}`, request);
  }
}

export const learningPathApi = new LearningPathApi();

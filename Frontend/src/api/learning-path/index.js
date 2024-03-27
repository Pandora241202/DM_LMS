import axios from 'axios';

const apiUrl = 'http://localhost:8080/learning-path';

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

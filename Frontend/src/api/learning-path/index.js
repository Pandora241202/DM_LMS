import axios from 'axios';

const apiUrl = 'http://localhost:8080/learning-path';

class LearningPathApi {
  getLearningPath() {
    return axios.get(`${apiUrl}/${learnerId}`);
  }

  createLearningPath(learnerId, request) {
    return axios.post(`${apiUrl}/${learnerId}`, request);
  }

  getRecommendedLearningPaths(request) {
    return axios.post(`${apiUrl}/recommended/${learnerId}`, request);
  }
}

export const learningPathApi = new LearningPathApi();

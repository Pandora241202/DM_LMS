//import axios from 'axios';
import { LOs, baseInfoLearningPath } from "./data";
import { deepCopy } from '../../utils/deep-copy';
import { useAuth } from '../../hooks/use-auth';
import { wait } from "../../utils/wait";

//const apiUrl = 'http://localhost:8080/learningpath';
//const { user } = useAuth();

class LearningPathApi {
  getLearningPath() {
    //return axios.get(apiUrl);
    return {data: []};
    //return Promise.resolve(deepCopy({data: LOs}));
  }

  createLearningPath(request) {
    //return axios.post(apiUrl, request);
    return Promise.resolve(deepCopy({data: LOs}));
  }

  getBaseInfoLearningPath() {
    return Promise.resolve(deepCopy({data: baseInfoLearningPath}));
    return Promise.resolve(deepCopy({data: {
      "learningStyle": [],
      "backgroundKnowledge": null,
      "qualification": null
    }}));
  }
}

export const learningPathApi = new LearningPathApi();

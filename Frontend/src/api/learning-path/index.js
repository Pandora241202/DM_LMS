//import axios from 'axios';
import { LOs } from "./data";
import { deepCopy } from '../../utils/deep-copy';

//const apiUrl = 'http://localhost:8080/forum';

class LearningPathApi {
  getLOs() {
    //return axios.get(apiUrl);
    return Promise.resolve(deepCopy({data: LOs}));
  }
}

export const learningPathApi = new LearningPathApi();

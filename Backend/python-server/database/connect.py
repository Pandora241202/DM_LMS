from time import strftime, localtime
import psycopg2
import json
from datetime import datetime
class Learner:
    def fromEntity(learner):
        birth_year = datetime.fromtimestamp(learner[1]/1000).year
        return {
            "id": learner[3],
            "name": learner[0],
            "age": datetime.now().year - birth_year,
            "gender": learner[2],
            "background_knowledge": learner[4],
            "qualification": learner[5],
            "active_reflective": learner[6],
            "global_sequential": learner[7],
            "sensitive_intuitive": learner[8],
            "visual_verbal": learner[9]   
        }
        
        
class connectDatabase:
    def __init__(self):
        self.connection = psycopg2.connect(host='localhost', database='learning_system', user='root', password='12345')
        self.cursor = self.connection.cursor()
        
    def learners(self):
        query = "SELECT u.name, u.birth, u.gender, l.id, l.background_knowledge, l.qualification, l.active_reflective, l.global_sequential, l.sensitive_intuitive, l.visual_verbal FROM learners as l JOIN authenticated_user as u ON u.id = l.user_id"
        self.cursor.execute(query)
        learners = list(map(Learner.fromEntity, self.cursor.fetchall()))
        
        return json.dumps(learners)

    def lms():
        pass
    
    def logs():
        pass
    
    def __del__(self):
        self.cursor.close()
        self.connection.close()
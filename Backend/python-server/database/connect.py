import psycopg2

class connectDatabase:
    def __init__(self):
        self.connection = psycopg2.connect(host='localhost', database='learning_system', user='root', password='12345')
        self.cursor = self.connection.cursor()
        
    def learners(self):
        query = "SELECT * FROM learners as l JOIN authenticated_user as u ON u.id = l.user_id"
        self.cursor.execute(query)
        learners = self.cursor.fetchall()
        print(learners)

    def lms():
        pass
    
    def logs():
        pass
    
    def __del__(self):
        self.cursor.close()
        self.connection.close()
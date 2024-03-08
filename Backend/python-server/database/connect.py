import psycopg2

class connectDatabase:
    def __init__(self):
        self.connection = psycopg2.connect(host='localhost', database='learning_system', user='root', password='123')

    def learners():
        pass

    def lms():
        pass
    
    def logs():
        pass
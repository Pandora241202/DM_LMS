import psycopg2

class connectDatabase:
    connection = psycopg2.connect(host='prod', database='sde', user='root', password='123')
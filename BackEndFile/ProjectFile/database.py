import mysql.connector # python -m pip install mysql-connector-python
from mysql.connector.errors import Error 

def get_connection():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Jvenkatesh78@",
            database="Mid_Level_Project",
            port=3306
        )
        print("Database Connected")
        if conn.is_connected():
            return conn
    except Error as e:
        print("Database Connection Error :", e)
        return None
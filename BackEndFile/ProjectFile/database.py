import os
import mysql.connector
from mysql.connector.errors import Error
from dotenv import load_dotenv

load_dotenv()

def get_connection():
    try:
        conn = mysql.connector.connect(
            host=os.getenv("DB_HOST"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            database=os.getenv("DB_NAME"),
            port=int(os.getenv("DB_PORT"))
        )

        print("Database Connected")

        if conn.is_connected():
            return conn

    except Error as e:
        print("Database Connection Error :", e)
        return None
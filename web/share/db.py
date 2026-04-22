
import mysql
import mysql.connector
import platform
import os
import time

from dotenv import load_dotenv
from flask import current_app, g
from functools import lru_cache
from mysql.connector import Error
from mysql.connector import pooling

load_dotenv()

db_pool = None

RETRY_ERRORS = {2006, 2013, 2055}

def create_pool_with_retry():

    """Create MySQL pool and retry until DB is available."""

    while True:

        try:

            is_linux = platform.system() == "Linux"

            if is_linux:
                DB_HOST = os.getenv("DB_PRODUCTION_HOST")

            else:
                DB_HOST = os.getenv("DB_DEV_HOST")


            pool = pooling.MySQLConnectionPool(
                pool_name="main_pool",
                pool_size=5,
                # host=os.getenv("DB_HOST"),

                host = DB_HOST,

                user=os.getenv("DB_USER"),
                password=os.getenv("DB_PASSWORD"),
                database=os.getenv("DB_NAME"),
                port=int(os.getenv("DB_PORT", 3306)),
                autocommit=False
                # use_pure=True
            )

            # test connection
            conn = pool.get_connection()
            conn.ping(reconnect=False)
            conn.close()

            return pool

        except mysql.connector.Error as err:

            time.sleep(5)

def get_db():

    """Get connection from pool."""

    global db_pool

    if db_pool is None:
        db_pool = create_pool_with_retry()

    if "db_conn" not in g:
        while True:
            try:
                conn = db_pool.get_connection()
                conn.ping(reconnect=True, attempts=3, delay=2)
                g.db_conn = conn
                break

            except mysql.connector.Error as err:

                db_pool = None
                time.sleep(5)
                db_pool = create_pool_with_retry()

    return g.db_conn

def db_connection(query, params=None, one_row=False):

    """Execute SQL query."""

    global db_pool

    while True:

        conn = None
        cursor = None

        try:

            conn = get_db()

            cursor = conn.cursor()

            cursor.execute(query, params or ())

            if cursor.with_rows:
                return cursor.fetchone() if one_row else cursor.fetchall()
            else:
                conn.commit()
                return None

        except mysql.connector.Error as err:

            if err.errno in RETRY_ERRORS:

                time.sleep(5)

                db_pool = None

                if "db_conn" in g:
                    try:
                        g.db_conn.close()
                    except Exception:
                        pass
                    g.pop("db_conn", None)

                continue

            else:

                raise

        finally:
            if cursor:
                try:
                    cursor.close()
                except Exception:
                    pass

# Náhrada SQL dotazu

@lru_cache(maxsize=1)
def get_patient_types():
    SQL = "SELECT PatientTypeID, TypeNameCZE FROM Type_Patients"
    return db_connection(SQL, (), False)

def get_next_patient_id():
    conn = get_db()
    cur = conn.cursor(buffered=True)
    try:
        cur.execute("""
            UPDATE LastIdTracker
            SET LastID = LAST_INSERT_ID(LastID + 1)
            WHERE EntityName = %s
        """, ('PatientID',))

        cur.execute("SELECT LAST_INSERT_ID()")
        new_id = cur.fetchone()[0]

        conn.commit()
        return new_id
    finally:
        cur.close()



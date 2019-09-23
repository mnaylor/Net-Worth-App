import psycopg2

class DatabaseHandler(object):
    def __init__(self):
        pass

    def get_entries(self):
        return []

    def upsert_entry(self, id=None):
        entry_id = 1
        return entry_id

    def delete_entry(self, id):
        return True

    def _get_client(self):
        conn = psycopg2.connect("dbname=test user=postgres")
        return conn
import psycopg2

class DatabaseHandler(object):
    def __init__(self):
        self.conn = self._get_client()

    def get_entries(self):
        with self.conn.cursor() as cursor:
            cursor.execute('SELECT * FROM entries;')
            rows = cursor.fetchall()
        return rows

    def upsert_entry(self, id=None):
        entry_id = 1
        return entry_id

    def delete_entry(self, id):
        return True

    def _get_client(self):
        conn = psycopg2.connect("dbname=NetWorthCalculator user=postgres password=mozart")
        return conn
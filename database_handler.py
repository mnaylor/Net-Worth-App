import psycopg2

class Entry(object):
    def __init__(self, name, category, amount, is_asset=True, id=None):
        self.name = name
        self.category = category
        self.is_asset = is_asset
        self.amount = amount
        self.id = id

class DatabaseHandler(object):
    def __init__(self):
        self.conn = self._get_client()

    def get_entries(self):
        results = []
        with self.conn.cursor() as cursor:
            try:
                cursor.execute('SELECT * FROM entries;')
                rows = cursor.fetchall()
            except Exception as error:
                print(error)
                raise error

        results = [Entry(row[1], row[2], row[4], row[3], row[0]) for row in rows]
        return results

    def upsert_entry(self, entry):
        entry_id = None
        if not entry.id:
            query = '''
                        INSERT INTO entries 
                        (entry_name, entry_category, is_asset, amount) 
                        VALUES (%s, %s, %s, %s) RETURNING entry_id;
                    '''
            params = (entry.name, entry.category, entry.is_asset, entry.amount)
        else:
            query = '''
                        UPDATE entries SET 
                        (entry_name, entry_category, is_asset, amount) = 
                        (%s, %s, %s, %s)
                        WHERE entry_id = %s 
                        RETURNING entry_id;
                    '''
            params = (entry.name, entry.category, entry.is_asset, entry.amount, entry.id)

        with self.conn.cursor() as cursor:
            try:
                cursor.execute(query, params)
                row = cursor.fetchone()
                entry_id = row[0]
            except Exception as error:
                print(error)

        return entry_id

    def delete_entry(self, entry):
        success = True
        query = 'DELETE FROM entries WHERE entry_id = %s'
        with self.conn.cursor() as cursor:
            try:
                cursor.execute(query, (entry.entry_id,))
            except Exception as error:
                print(error)
                success = False

        return success

    def _get_client(self):
        conn = psycopg2.connect("dbname=NetWorthCalculator user=postgres password=mozart")
        conn.autocommit = True
        return conn
import psycopg2

class Entry(object):
    def __init__(self, name, category, amount, is_asset=True, id=None):
        self.name = name
        self.category = category
        self.is_asset = is_asset
        self.amount = amount
        self.entry_id = id

    def to_json(self):
        return {
            'name': self.name,
            'category': self.category,
            'is_asset': self.is_asset,
            'amount': self.amount,
            'entry_id': self.entry_id
        }

class DatabaseHandler(object):
    def get_entries(self):
        results = []
        with self._get_cursor() as cursor:
            try:
                cursor.execute('SELECT * FROM entries;')
                rows = cursor.fetchall()
            except Exception as error:
                print(error)
                raise error

        results = [Entry(row[1], row[2], row[4], row[3], row[0]).to_json() for row in rows]
        return results

    def upsert_entry(self, entry):
        entry_id = None
        if not entry.entry_id:
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
            params = (entry.name, entry.category, entry.is_asset, entry.amount, entry.entry_id)

        with self._get_cursor() as cursor:
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
        with self._get_cursor() as cursor:
            try:
                cursor.execute(query, (entry.entry_id,))
            except Exception as error:
                print(error)
                success = False

        return success

    def _get_cursor(self):
        conn = psycopg2.connect("dbname=NetWorthCalculator user=postgres password=mozart")
        conn.autocommit = True
        return conn.cursor()
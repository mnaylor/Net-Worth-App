import unittest

from database_handler import DatabaseHandler, Entry

class TestDatabaseHandler(unittest.TestCase):
    def setUp(self):
        self.db = DatabaseHandler()

    def test_get(self):
        results = self.db.get_entries()
        self.assertTrue(results)

    def test_new_entry(self):
        new_entry = Entry('foo', 'bar', 100)
        result = self.db.upsert_entry(new_entry)
        self.assertTrue(result)
    
    def test_update_entry(self):
        existing_entry = Entry('foo', 'bar', 6, False, 8)
        result = self.db.upsert_entry(existing_entry)
        self.assertTrue(result)

if __name__ == '__main__':
    unittest.main()
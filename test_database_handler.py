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

        # cleanup
        new_entry.entry_id = result
        self.db.delete_entry(new_entry)
    
    def test_delete_entry(self):
        # setup
        new_entry = Entry('foo', 'bar', 100)
        result = self.db.upsert_entry(new_entry)

        new_entry.entry_id = result
        success = self.db.delete_entry(new_entry)
        self.assertTrue(success)

    def test_update_entry(self):
        existing_entry = Entry('foo', 'bar', 6, False, 8)
        result = self.db.upsert_entry(existing_entry)
        self.assertTrue(result)

if __name__ == '__main__':
    unittest.main()
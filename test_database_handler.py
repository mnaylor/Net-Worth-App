import unittest

from database_handler import DatabaseHandler

class TestDatabaseHandler(unittest.TestCase):
    def setUp(self):
        self.db = DatabaseHandler()

    def test_get(self):
        results = self.db.get_entries()
        self.assertTrue(results)

if __name__ == '__main__':
    unittest.main()
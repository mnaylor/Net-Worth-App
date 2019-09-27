import unittest
import requests

class TestEndpoints(unittest.TestCase):
    def setUp(self):
        self.base_url = 'http://localhost:5000'

    def test_get(self):
        response = requests.get('{}/entries'.format(self.base_url))
        result = response.json()
        self.assertTrue(response)

    def test_post(self):
        entry = {
            'name': 'foo',
            'category': 'bar',
            'is_asset': True,
            'amount': 100
        }
        response = requests.post('{}/entry'.format(self.base_url), json=entry)
        self.assertTrue(response)

    def test_missing_param_post(self):
        entry = {
            'name': 'foo',
            'category': 'bar',
            'is_asset': True
        }
        response = requests.post('{}/entry'.format(self.base_url), json=entry)
        self.assertEqual(response.status_code, 400)

    def test_invalid_param_post(self):
        entry = {
            'name': 'foo',
            'category': 'bar',
            'is_asset': True,
            'amount': -100
        }
        response = requests.post('{}/entry'.format(self.base_url), json=entry)
        self.assertEqual(response.status_code, 400)

    def test_delete(self):
        response = requests.delete('{}/entry/{}'.format(self.base_url, 2))
        self.assertTrue(response)

if __name__ == '__main__':
    unittest.main()
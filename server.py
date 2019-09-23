from flask import Flask, request
from flask_restplus import Resource, Api, fields

app = Flask(__name__)
api = Api(app)

TEMP_DATABASE = []

@api.route('/entries')
class Entries(Resource):
    def get(self):
        return TEMP_DATABASE

@api.route('/entry/<string:entry_id>')
class Entry(Resource):
    def put(self, entry_id):
        entry = request.form['data']
        return {}

    def delete(self, entry_id):
        # delete all the things
        return {}

if __name__ == '__main__':
    app.run(debug=True)
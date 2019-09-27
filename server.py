from flask import Flask, request
from flask_restplus import Resource, Api, fields

from database_handler import DatabaseHandler, EntryDataObject

app = Flask(__name__)
api = Api(app)

#namespace = api.namespace('Entries', description='Entry operations')
entry_model = api.model('Entry', {
    'entry_id': fields.Integer(readonly=True, description='The entry unique identifier'),
    'name': fields.String(required=True, description='The entry name'),
    'category': fields.String(required=True, description='The entry category'),
    'is_asset': fields.Boolean(required=True, description='If asset, True, else False'),
    'amount': fields.Integer(required=True, min=0, description='The entry amount')
})

@api.route('/entries')
class EntryList(Resource):
    @api.marshal_list_with(entry_model)
    def get(self):
        db = DatabaseHandler()
        return db.get_entries()

@api.route('/entry/<string:entry_id>')
class EntryDelete(Resource):
    def delete(self, entry_id):
        print('foo')
        # delete all the things
        return {}

@api.route('/entry')
class EntryPost(Resource):
    @api.expect(entry_model, validate=True)
    @api.marshal_with(entry_model)
    def post(self):
        data = api.payload
        entry = EntryDataObject(data)

        db = DatabaseHandler()
        entry_id = db.upsert_entry(entry)
        if entry_id:
            entry.entry_id = entry_id
            return entry.to_json()
        else:
            # mnaylor TODO return an error
            return {}

if __name__ == '__main__':
    app.run(debug=True)
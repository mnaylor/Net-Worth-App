from flask import Flask, request
from flask_restplus import Resource, Api, fields
from flask_cors import CORS

from database_handler import DatabaseHandler, EntryDataObject

app = Flask(__name__)
CORS(app)
api = Api(app)

entry_model = api.model('Entry', {
    'entry_id': fields.Integer(readonly=True, description='The entry unique identifier'),
    'name': fields.String(required=True, description='The entry name'),
    'category': fields.String(required=True, description='The entry category'),
    'is_asset': fields.Boolean(required=True, description='If asset, True, else False'),
    'amount': fields.Float(required=True, min=0, description='The entry amount')
})

@api.route('/entries')
class EntryList(Resource):
    @api.marshal_list_with(entry_model)
    def get(self):
        db = DatabaseHandler()
        return db.get_entries(), 200, {'Access-Control-Allow-Origin': '*'}

@api.route('/entry/<string:entry_id>')
class EntryDelete(Resource):
    def delete(self, entry_id):
        db = DatabaseHandler()
        success = db.delete_entry(entry_id)
        if success:
            return '', 204, {'Access-Control-Allow-Origin': '*'}
        else:
            api.abort(500, 'Server failed to upsert entry.')

@api.route('/entry')
class EntryPost(Resource):
    @api.expect(entry_model, validate=True)
    @api.marshal_with(entry_model)
    def post(self):
        data = api.payload
        entry = EntryDataObject(data['name'], data['category'],
                                data['amount'], data['is_asset'],
                                data['entry_id'] if 'entry_id' in data else None)

        db = DatabaseHandler()
        entry_id = db.upsert_entry(entry)
        if entry_id:
            entry.entry_id = entry_id
            return entry.to_json(), 201, {'Access-Control-Allow-Origin': '*'}
        else:
            api.abort(500, 'Server failed to upsert entry.')

if __name__ == '__main__':
    app.run(debug=True)
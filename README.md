# Net Worth Calculator

## Setup

### Postgres database setup
Run ```<path>/server/create_tables.sql``` on local postgres server

### Server setup
```
cd <path>/NetWorthCalculator/server
pip install -r requirements.txt
python server.py
```
Server should be running on localhost:5000

### App setup
```
cd <path>/net-worth-app
npm install
npm start
```
App should be running on localhost:3000
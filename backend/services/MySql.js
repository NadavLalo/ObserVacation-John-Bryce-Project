var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'project3_db',
  dateStrings: 'date'
});

connection.connect();

module.exports = connection;

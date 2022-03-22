const mysql = require('mysql');
const dbConfig = require('./db');

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});
connection.connect(error => {
    if (error) throw error;
    console.log('Se conecto a la BD!!');
});
module.exports = connection;

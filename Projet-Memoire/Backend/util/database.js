const mysql = require('mysql');
const config = require('../config/config.json');

const connection = mysql.createConnection({
    host:  config.host,
    user:  config.user,
    password: config.password,
    database: config.database
});

connection.connect((err) => {
    if(err) throw err ; 
    console.log('connecté');
});

module.exports = connection;


/*const mysql2 = require('mysql2');

const config = require('../config/config.json');


const pool =  mysql2.createPool({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password
});*/
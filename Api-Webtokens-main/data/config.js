const mysql = require('mysql');

const config = {
    host : 'localhost',
    user: 'michelle',
    password:   'grecia66',
    database: 'api'
}

const pool = mysql.createPool(config);

module.exports = pool;
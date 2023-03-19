const mysql = require('mysql2');  // import sql 

//Connect to sql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'team_roster'
});

module.exports = db;

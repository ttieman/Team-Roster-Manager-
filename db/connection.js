const mysql = require('mysql2');  // import sql 

//Connect to sql

const mysqlP = require('mysql2/promise');

// Database connection configuration
const connectionConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'team_roster',
};

// Initialize the connection variable
const dbP = mysqlP.createConnection(connectionConfig);
const db = mysql.createConnection(connectionConfig);


module.exports = {db,
                  dbP};
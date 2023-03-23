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
const dbP = mysqlP.createConnection(connectionConfig);// this is for promise sql connection
const db = mysql.createConnection(connectionConfig); //this is for basic sql connection


module.exports = {db,
                  dbP};
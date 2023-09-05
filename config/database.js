// Database connection configuration
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/mydatabase.db'); // Adjust the path as needed

module.exports = db;

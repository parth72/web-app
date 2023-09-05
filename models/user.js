const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/mydatabase.db'); // Adjust the path as needed

// Function to get a user by username
exports.getUserByUsername = (username, callback) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  db.get(query, [username], (err, row) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, row);
    }
  });
};

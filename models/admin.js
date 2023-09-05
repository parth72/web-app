const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/mydatabase.db'); // Adjust the path as needed

// Function to get an admin by username
exports.getAdminByUsername = (username, callback) => {
  const query = 'SELECT * FROM admins WHERE username = ?';
  db.get(query, [username], (err, row) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, row);
    }
  });
};
]
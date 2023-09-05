const bcrypt = require('bcrypt');

// Hash the password
const saltRounds = 10; // You can adjust the number of salt rounds for security
const adminPassword = 'admin123'; // Replace with the admin's actual password

bcrypt.hash(adminPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('Hashed password:', hash);
  }
});

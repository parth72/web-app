const db = require('../models/user'); // Assuming you have a user model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'MY_SECRET_KEY_PARTH_023@'; // Replace with your own secret key

// Controller for user authentication
exports.authenticateUser = (req, res) => {
  const { username, password } = req.body;

  // Authenticate the user
  db.getUserByUsername(username, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed. User not found.' });
    }

    // Verify the password
    bcrypt.compare(password, user.password, (bcryptErr, bcryptRes) => {
      if (bcryptErr) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (!bcryptRes) {
        return res.status(401).json({ error: 'Authentication failed. Wrong password.' });
      }

      // Generate a JWT token
      const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });

      // Respond with the token
      res.status(200).json({ token });
    });
  });
};

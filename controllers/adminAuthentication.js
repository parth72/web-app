const db = require('../models/admin'); // Create an admin model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'ADMIN_SECRET_KEY_PARTH_023@'; // Replace with your own secret key

// Controller for admin authentication
exports.authenticateAdmin = (req, res) => {
  const { username, password } = req.body;

  // Authenticate the admin
  db.getAdminByUsername(username, (err, admin) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (!admin) {
      return res.status(401).json({ error: 'Admin authentication failed. Admin not found.' });
    }

    // Verify the password
    bcrypt.compare(password, admin.password, (bcryptErr, bcryptRes) => {
      if (bcryptErr) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (!bcryptRes) {
        return res.status(401).json({ error: 'Admin authentication failed. Wrong password.' });
      }

      // Generate a JWT token
      const token = jwt.sign({ username: admin.username }, secretKey, { expiresIn: '1h' });

      // Respond with the token
      res.status(200).json({ token });
    });
  });
};

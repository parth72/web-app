// In app.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./database');
const authenticateJWT = require('./authMiddleware'); // Import the JWT middleware

const app = express();
app.use(express.json());

const secretKey = 'MY_SECRET_KEY_PARTH_023@'; // Replace with a strong, secret key

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Retrieve the user from the database by username
  const user = await getUserByUsername(username);

  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Verify the password
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Generate a JWT token
  const token = jwt.sign(user, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour

  // Successful login, send the token to the client
  res.status(200).json({ token });
});

// Protected endpoint (requires authentication)
app.get('/protected', authenticateJWT, (req, res) => {
  // Access user information from the request object
  const { username } = req.user;
  res.status(200).json({ message: `Hello, ${username}! This is a protected route.` });
});

// Function to retrieve a user by username
function getUserByUsername(username) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

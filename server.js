const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const verifyToken = require('C:\Users\parth chopra\WebApp\middleware\auth.js'); // Modify the path to your auth middleware
const app = express();
const port = process.env.PORT || 3000;
const secretKey = 'MY_SECRET_KEY_PARTH_023@'; // Replace with your own secret key
app.use(bodyParser.json());

// Database setup
const db = new sqlite3.Database('mydatabase.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the database.');
  }
});

// Step 3: Create an API endpoint for user authentication
app.post('/api/authenticate', (req, res) => {
  const { username, password } = req.body;

  // Step 4: Authenticate the user
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (!row) {
      return res.status(401).json({ error: 'Authentication failed. User not found.' });
    }

    // Step 5: Verify the password
    bcrypt.compare(password, row.password, (bcryptErr, bcryptRes) => {
      if (bcryptErr) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (!bcryptRes) {
        return res.status(401).json({ error: 'Authentication failed. Wrong password.' });
      }

      // Step 6: Generate a JWT token
      const tokenPayload = { username: row.username, role: row.role }; // Include role in the payload
      const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '1h' });

      // Step 7: Respond with the token
      res.status(200).json({ token });
    });
  });
});

// Step 8: Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Protected resource route, only accessible by authenticated users
app.get('/api/protected-resource', verifyToken, (req, res) => {
  // The user's role is available in req.user.role
  if (req.user.role === 'admin') {
    // Admins can access this resource
    res.status(200).json({ message: 'Admin access to protected resource.' });
  } else if (req.user.role === 'user') {
    // Users can access this resource
    res.status(200).json({ message: 'User access to protected resource.' });
  } else {
    // Unauthorized access
    res.status(403).json({ error: 'Access denied.' });
  }
});

// Step 9: Create an API endpoint for the admin to create new users
app.post('/api/admin/users', verifyToken, (req, res) => {
  // Check if the authenticated user is an admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admin role required.' });
  }

  // Parse user data from the request body
  const { username, password, role } = req.body;

  // Perform validation and error handling as needed

  // Hash the password before storing it in the database
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Insert the new user into the database
    db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.status(201).json({ message: 'User created successfully.' });
    });
  });
});

// Implement similar routes for viewing, updating, and deleting users
// You can use the above route structure as a template
// Step 10: Create an API endpoint for the admin to view a list of all users
app.get('/api/admin/users', verifyToken, (req, res) => {
  // Check if the authenticated user is an admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admin role required.' });
  }

  // Retrieve all users from the database
  db.all('SELECT * FROM users', (err, users) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Return the list of users
    res.status(200).json(users);
  });
});
// Step 11: Create an API endpoint for the admin to view user details
app.get('/api/admin/users/:username', verifyToken, (req, res) => {
  // Check if the authenticated user is an admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admin role required.' });
  }

  const { username } = req.params;

  // Retrieve user details from the database
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Return the user details
    res.status(200).json(user);
  });
});
// Step 12: Create an API endpoint for the admin to update user details
app.put('/api/admin/users/:username', verifyToken, (req, res) => {
  // Check if the authenticated user is an admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admin role required.' });
  }

  const { username } = req.params;
  const { password, role } = req.body;

  // Update user details in the database
  db.run('UPDATE users SET password = ?, role = ? WHERE username = ?', [password, role, username], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(200).json({ message: 'User details updated successfully.' });
  });
});
// Step 13: Create an API endpoint for the admin to delete a user
app.delete('/api/admin/users/:username', verifyToken, (req, res) => {
  // Check if the authenticated user is an admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admin role required.' });
  }

  const { username } = req.params;

  // Delete the user from the database
  db.run('DELETE FROM users WHERE username = ?', [username], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(200).json({ message: 'User deleted successfully.' });
  });
});


const jwt = require('jsonwebtoken');
const secretKey = 'MY_SECRET_KEY_PARTH_023@'; // Replace with your own secret key

// Middleware for verifying JWT tokens
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized. Token is missing.' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden. Invalid token.' });
    }

    req.username = decoded.username;
    next();
  });
};

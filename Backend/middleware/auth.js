const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load .env

const secretKey = process.env.JWT_SECRET_KEY; // ✅ Correct name

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; // ✅ Correct way to access cookies

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Token. Access Forbidden.' });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;

const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET_KEY;

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
 // Bearer Token
    const tokkkken = authHeader && authHeader.split(' ')[1];  
    const token = authHeader; 
  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Token. Access Forbidden.' });
    }

    req.user = user; // Attach user info to request
    next(); // Proceed to next middleware or route
  });
};

module.exports = authenticateToken;

import jwt from 'jsonwebtoken';
const crypto = require('crypto');

// Generate a random 256-bit (32-byte) key
const secretKey = crypto.randomBytes(32).toString('hex');

// Function to generate and store token
export const generateToken = (firstName) => {
  if (!firstName ) {
    console.error("Name are required to generate a token.");
    return;
  }

// Create payload
 const payload = {
    firstName
  };

  // Generate token (valid for 1 hour)
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

  // Store token in localStorage
  localStorage.setItem('userToken', token);
  console.log("JWT generated and stored:", token);
  return token;
};

// Function to get token
export const getToken = () => {
  const token = localStorage.getItem('userToken');
  if (!token) {
    console.log("No token found.");
    return null;
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log("Decoded token:", decoded);
    return decoded;
  } catch (error) {
    console.error("Token is invalid or expired:", error.message);
    localStorage.removeItem('userToken');
    return null;
  }
};

// Function to delete token (logout)
export const deleteToken = () => {
  localStorage.removeItem('userToken');
  console.log("Token deleted.");
};

const jwt = require("jsonwebtoken");

// Function to generate a JWT
function generateToken(userId) {
  const secretKey = "your_secret_key_here"; // Replace with a secure key

  const payload = {
    userId: userId,
    role: "user", // Example additional data
  };

  const options = {
    expiresIn: "1h", // Token expiration time
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
}

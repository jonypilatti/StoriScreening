const jwt = require("jsonwebtoken");

// Secret key used to sign and verify JWTs
const secretKey = "your-secret-key";

// Function to generate a JWT token based on user data
const generateJWT = (userData) => {
  // Create a JWT token with user data and a secret key
  return jwt.sign(userData, secretKey, { expiresIn: "1h" }); // You can adjust the expiration time as needed
};

module.exports = generateJWT;

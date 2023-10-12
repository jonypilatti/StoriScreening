const jwt = require("jsonwebtoken");
require("dotenv").config();
// Middleware to verify and extract user data from the JWT token
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  const secretKey = process.env.JWT_SECRET_KEY;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token is not valid" });
    }
    req.user = decoded; // Attach the user data to the request object
    next();
  });
}
module.exports = { verifyToken };

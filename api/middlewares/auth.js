const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  res.status(403).json({ message: "ForbiddenA" });
};

// Export the middleware function
module.exports = {
  isAdmin,
};

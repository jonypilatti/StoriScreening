const express = require("express");
const router = express.Router();
const queryManager = require("../utils/queryManager");
const jwt = require("jsonwebtoken");
const generateJWT = require("../utils/generateJWT");
const passport = require("passport");
const { verifyPassword, getUserByEmail } = require("../controllers/controllersLogIn");
// const { isAdmin } = require("../middlewares/auth");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // Use "email" as the username field
      passwordField: "password", // Use "password" as the password field
    },
    async (email, password, done) => {
      try {
        // Lookup user by email in the database
        const user = await getUserByEmail(email);
        console.log(user, "el passport use user");
        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        // Check password validity
        const isValidPassword = await verifyPassword(password, user.password_hash);

        if (!isValidPassword) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      } catch (error) {
        console.log(error, "el error del passport use");
        return done(error);
      }
    }
  )
);
router.post("/signUp", async (req, res) => {
  const { email, hashedPassword } = req.body;
  const role = "user";
  console.log("Entro a la ruta", email, hashedPassword);
  try {
    if (email && hashedPassword) {
      const query = "INSERT INTO Users (email, password_hash,role) VALUES ($1, $2, $3)";
      const values = [email, hashedPassword, role];
      await queryManager(query, values);
      return res.status(200).json({ message: "User signed up successfully", Error: null });
    } else return res.status(200).json({ message: null, Error: "Please enter email and password" });
  } catch (err) {
    console.error(err, "the error in /signUp route");
    return res.status(500).json({ message: null, Error: "Something went wrong in the /signUp route" });
  }
});
router.post("/setAdminUser", async (req, res) => {
  const { token } = req.body;
  try {
    if (token) {
      const query = "UPDATE Users SET role='admin' WHERE email=$1";
      const values = [token.email];
      await queryManager(query, values);
      return res.status(200).json({ message: "User updated successfully", Error: null });
    } else return res.status(200).json({ message: null, Error: "Please enter token" });
  } catch (err) {
    console.error(err, "the error in /setAdminUser route");
    return res.status(500).send({ message: null, Error: "Something went wrong in the /setAdminUser route" });
  }
});

router.post("/logIn", passport.authenticate("local", { session: false }), async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password, "las cosas s");
    if (email) {
      // Assuming you have user data available in req.user
      const user = req.user;
      console.log(user, "el user del logIN");
      if (user && user.password_hash === password) {
        const token = generateJWT({ email, role: user.role });
        return res.status(200).json({ token, message: "User logged in successfully", error: null });
      } else {
        return res.status(400).json({ message: null, error: "User not found" });
      }
    } else {
      return res.status(400).json({ message: null, error: "Please enter email" });
    }
  } catch (err) {
    console.error(err, "the error in /logIn route");
    return res.status(500).json({ message: null, error: "Something went wrong in the /logIn route" });
  }
});

module.exports = router;

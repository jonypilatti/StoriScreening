const express = require("express");
const router = express.Router();
const queryManager = require("../utils/queryManager");

let renderCount = 0;

router.post("/signUp", async (req, res) => {
  const { email, hashedPassword } = req.body;
  try {
    if (email && hashedPassword) {
      const query = "ISERT INTO Users (email, hashedPassword) VALUES ($1, $2)";
      const values = [email, hashedPassword];
      await queryManager(query, values);
      return res.status(200).json({ message: "User signed up successfully", Error: null });
    } else return res.status(200).json({ message: null, Error: "Please enter email and password" });
  } catch (err) {
    console.error(err, "the error in /signUp route");
    return res.status(500).json({ message: null, Error: "Something went wrong in the /signUp route" });
  }
});

router.get("/logIn", async (req, res) => {});

module.exports = router;

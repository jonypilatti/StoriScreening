const express = require("express");
const router = express.Router();
const routesAdmin = require("./routesAdmin");
const routesLogin = require("./routesLogIn");
router.use("/", routesAdmin);
router.use("/logIn", routesLogin);

module.exports = router;

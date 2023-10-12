const express = require("express");
const router = express.Router();
const routesAdmin = require("./routesAdmin");
const routesLogIn = require("./routesLogIn");
router.use("/", routesAdmin);
router.use("/", routesLogIn);
module.exports = router;

const express = require("express");
const router = express.Router();
const routesAdmin = require("./routesAdmin");
const routesLogin = require("./routesLogIn");
const { isAdmin } = require("../middlewares/auth");
router.use("/", routesLogin);
router.use("/Admin", routesAdmin);

module.exports = router;

const express = require("express");
const router = express.Router();
const routesAdmin = require("./routesAdmin");
router.use("/", routesAdmin);

module.exports = router;

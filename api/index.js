const express = require("express");
const routes = require("./routes/routes");
const app = express();
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();
require("./database/connection");
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/", routes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});
app.listen(3001, () => console.log("Server listening at port 3001"));

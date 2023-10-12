const express = require("express");
const routes = require("./routes/routes");
const app = express();
const cors = require("cors");
require("dotenv").config();
const pool = require("./database/connection");
const fs = require("fs");

const uploadsDirectory = "uploads";

if (!fs.existsSync(uploadsDirectory)) {
  fs.mkdirSync(uploadsDirectory);
}
const scheduler = require("./utils/newsletterScheduler")(pool);
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/", routes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});
app.listen(3001, () => console.log("Server listening at port 3001"));

const { Pool } = require("pg");
// Replace these values with your PostgreSQL database configuration
const pool = new Pool({
  user: process.env.POSTGRESQL_USER,
  host: "localhost",
  database: process.env.POSTGRESQL_DATABASE,
  password: process.env.POSTGRESQL_PASSWORD,
  port: 5432, // PostgreSQL default port
});

pool.on("error", (err, client) => {
  console.error("Error in PostgreSQL pool:", err);
});
pool.on("connect", (msg, client) => {
  console.log("Connected to the database:", msg);
});

module.exports = pool;

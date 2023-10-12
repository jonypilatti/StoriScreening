const { promisify } = require("util");
const pool = require("../database/connection");
const queryExecutioner = async (query, values) => {
  const queryAsync = promisify(pool.query).bind(pool);

  try {
    const result = await queryAsync(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error; // Re-throw the error to be caught elsewhere
  }
};

module.exports = queryExecutioner;

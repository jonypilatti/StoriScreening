const { promisify } = require("util");
const pool = require("../database/connection");
const queryExecutioner = async (query, values) => {
  const queryAsync = promisify(pool.query).bind(pool);

  try {
    console.log("llego a la query y fallo", query, values);
    const result = await queryAsync(query, values);
    console.log(result, "el resultado de la query");
    return result.rows;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error; // Re-throw the error to be caught elsewhere
  }
};

module.exports = queryExecutioner;

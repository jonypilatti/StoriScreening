const queryManager = require("../utils/queryManager");

const verifyPassword = (password, userPassword) => {
  console.log(password, userPassword, "las pass que comparo");
  if (password === userPassword) return true;
  else return false;
};
const getUserByEmail = async (email) => {
  try {
    const getUserQuery = "SELECT * FROM Users WHERE email=$1";
    const values = [email];
    const user = await queryManager(getUserQuery, values);
    return user?.[0];
  } catch (err) {
    console.log(err, "the error of getUserByEmail");
    throw new Error(err?.message || "Error getting user by email");
  }
};
module.exports = {
  verifyPassword,
  getUserByEmail,
};

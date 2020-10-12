const db = require("../database/connection.js");

module.exports = {
  add,
  //   find,
  findBy,
};

function add(user) {
  try {
    return db("users").insert(user);
  } catch (error) {
    throw error;
  }
}

function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}

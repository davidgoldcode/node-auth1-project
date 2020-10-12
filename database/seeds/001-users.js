exports.seed = function (knex) {
  return knex("users").insert([
    { username: "David", password: "pw" },
    { username: "Beau", password: "pass" },
    { username: "Leo", password: "password" },
  ]);
};

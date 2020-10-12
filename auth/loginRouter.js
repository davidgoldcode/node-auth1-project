const router = require("express").Router();
const bcryptjs = require("bcryptjs");

const Users = require("./loginModel");

router.post("/register", (req, res) => {
  const credentials = req.body;

  const rounds = Number(process.env.HASH_ROUNDS) || 6;
  const hash = bcryptjs.hashSync(credentials.password, rounds);

  credentials.password = hash;

  Users.add(credentials)
    .then((user) => {
      res.status(201).json({ data: user });
    })
    .catch((err) => {
      res.json({ message: err.message });
    });
});

module.exports = router;

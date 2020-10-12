const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const loginRouter = require("../auth/loginRouter");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
// server.use(session(sessionConfiguration))

server.use("/api/login", loginRouter);

server.get("/", (req, res) => {
  res.json({ api: "Up", session: req.session });
});

module.exports = server;

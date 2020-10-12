const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const loginRouter = require("../auth/loginRouter");
const connection = require("../database/connection");

const server = express();

const sessionConfiguration = {
  name: "Chocolate Chip",
  secret: process.env.SESSION_SECRET || "Shhh, it's a secret",
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 10,
    secure: process.env.SECURE_COOKIES || false,
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStore({
    knex: connection,
    tablename: "sessions",
    sidfieldname: "sid",
    createTable: true,
    clearInterval: 1000 * 60 * 60,
  }),
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfiguration));

server.use("/api", loginRouter);

server.get("/", (req, res) => {
  res.json({ api: "Up", session: req.session });
});

module.exports = server;

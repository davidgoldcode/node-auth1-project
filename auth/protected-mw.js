module.exports = (req, res, next) => {
  console.log("SESSION!!!", req.session);
  if (req.session.username) {
    next();
  } else {
    res.status(401).json({ you: "cant passs homieeee" });
  }
};

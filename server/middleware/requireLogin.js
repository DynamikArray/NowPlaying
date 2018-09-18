module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(403).send({ error: "LOGIN_REQUIRED" });
  }
  next();
};

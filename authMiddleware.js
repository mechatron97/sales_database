/* eslint-disable max-len */
const jwt = require("jsonwebtoken");
const User = require("../server/model/user");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "secret", (err, decodedToken) => { // change secret to a longer string
      if (err) {
        console.log(err.message);
        res.redirect("/app/login");
      } else {
        // console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/app/login");
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "secret", async (err, decodedToken) => { // change secret to a longer string
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        const user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = {requireAuth, checkUser};

const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("./models/User");

const bcryptSalt = 10;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) next();
  else next({ status: 403, message: "Unauthorized" });
}

function createAnonymousUserIfNotLoggedIn(req, res, next) {
  if (req.user) {
    next();
    return;
  }
  let username = "Anonymous" + Math.floor(Math.random() * 1000000);
  User.create({ username }).then(user => {
    req.login(user, err => {
      if (err) {
        next(err);
        return;
      }
      // We are now logged in (notice req.user)
      next();
    });
  });
}

module.exports = {
  isLoggedIn,
  createAnonymousUserIfNotLoggedIn
};

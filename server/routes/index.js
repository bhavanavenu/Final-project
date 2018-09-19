const express = require("express");
const { isLoggedIn } = require("../middlewares");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({
    message: "this is the homepage"
  });
});

router.get("/secret", isLoggedIn, (req, res, next) => {
  res.json({
    secret: 42,
    user: req.user
  });
});

module.exports = router;

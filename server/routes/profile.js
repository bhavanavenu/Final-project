const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const Document = require("../models/Document");
const { isLoggedIn } = require("../middlewares");
const router = express.Router();

router.get("/", isLoggedIn, (req, res, next) => {
  res.json(req.user);
});
// get user profile
// router.get("/", isLoggedIn, (req, res, next) => {
//   Document.find({ _owner: req.user._id })
//     .then(documents => {
//       res.json(documents);
//     })
//     .catch(err => next(err));
// });

//user update details
router.put("/:username/edit", isLoggedIn, (req, res, next) => {
  let email = req.body.email;

  User.findOneAndUpdate({ username }, { email })
    .then(userDetail => {
      res.json({ success: true, user: userDetail });
    })
    .catch(err => next(err));
});

module.exports = router;

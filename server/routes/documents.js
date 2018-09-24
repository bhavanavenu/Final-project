const express = require("express");
const Document = require("../models/Document");

const router = express.Router();
var randomstring = require("randomstring");
const uploadCloud = require("../configs/cloudinary");

const { createAnonymousUserIfNotLoggedIn } = require("../middlewares");

router.post("/", createAnonymousUserIfNotLoggedIn, (req, res, next) => {
  Document.create({ _owner: req.user._id })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => next(err));
});

//create random url, connected users will be able to see saved items
router.post("/old", uploadCloud.single("doc"), (req, res, next) => {
  console.log("User --->", req.user);
  let { label, type, text } = req.body;

  let data = { label, type, text };
  if (req.file) {
    data.public_id = req.file.public_id;
    data.fileUrl = req.file.secure_url;
  }
  if (req.user) {
    data._owner = req.user._id;
  }
  data.randomUrl = randomstring.generate();
  Document.create(data)
    .then(document => {
      res.json(document);
    })
    .catch(err => next(err));
});

// //get docs from the other user
router.get("/:id/:randomUrl", (req, res, next) => {
  let docId = req.params.id;
  let randomUrl = req.params.randomUrl;
  Document.findOne({ $and: [{ _id: docId }, { randomUrl: randomUrl }] })
    .then(document => {
      res.json({
        success: true,
        document
      });
    })
    .catch(err => next(err));
});

// //delete document from db
//router.delete("/:id/:random", (req, res, next) => {});

// //delete docs if he uploads wrong docs
router.delete("/:id", (req, res, next) => {
  let docId = req.params.id;

  Document.findByIdAndRemove(docId)
    .then(document => {
      res.json({
        success: true,
        document
      });
    })
    .catch(err => next(err));
});

module.exports = router;

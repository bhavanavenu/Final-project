const express = require("express");
const Document = require("../models/Document");

const router = express.Router();
var randomstring = require("randomstring");
const uploadCloud = require("../configs/cloudinary");

//create random url, connected users will be able to see saved items
router.post("/", uploadCloud.single("doc"), (req, res, next) => {
  let { label, type, text } = req.body;
  let public_id = "";
  let fileUrl = "";
  let _owner = "";
  if (req.file) {
    public_id = req.file.public_id;
    fileUrl = req.file.secure_url;
  }
  if (req.user) {
    _owner = req.user._id;
  }
  let randomUrl = randomstring.generate();
  Document.create({
    label,
    type,
    text,
    randomUrl,
    fileUrl,
    public_id,
    _owner
  })
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

const express = require("express");
const Document = require("../models/Document");

const router = express.Router();
var randomstring = require("randomstring");
const uploadCloud = require("../configs/cloudinary");

//create random url
router.post("/", uploadCloud.single("doc"), (req, res, next) => {
  let { label, type, text } = req.body;
  let public_id = "";
  let fileUrl = "";
  if (req.file) {
    public_id = req.file.public_id;
    fileUrl = req.file.secure_url;
  }
  let randomUrl = randomstring.generate();
  Document.create({ label, type, text, randomUrl, fileUrl, public_id })
    .then(document => {
      res.json(document);
    })
    .catch(err => next(err));
});

// //get docs from the other user
router.get("/:id/:random", (req, res, next) => {
  let docId = req.params.id;
  let randomUrl = randomstring.generate();
  Document.findById(docId)
    .then(docId, randomUrl => {
      res.json({
        success: true,
        randomUrl
      });
    })
    .catch(err => next(err));
});

// //delete document from db
// router.delete("/:id/:random");

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

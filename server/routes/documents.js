const express = require("express");
const Document = require("../models/Document");

///AWS config////

var AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET
});
var s3 = new AWS.S3();

///////////////////

const router = express.Router();
var randomstring = require("randomstring");
//const uploadCloud = require("../configs/cloudinary");
const uploadCloud = require("../configs/s3");

const { createAnonymousUserIfNotLoggedIn } = require("../middlewares");

router.get("/:id", (req, res) => {
  Document.findById(req.params.id).then(doc => {
    res.json(doc);
  });
});

router.post("/", createAnonymousUserIfNotLoggedIn, (req, res, next) => {
  Document.create({ _owner: req.user._id })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => next(err));
});

router.post("/file", uploadCloud.single("file"), (req, res, next) => {
  // let fileUrl = req.file.secure_url;
  let fileUrl = req.file.location;
  //let publicId = req.file.public_id;
  let publicId = req.file.etag;
  console.log("DEBUG req.file", req.file);

  res.json({
    message: "File was created",
    fileUrl,
    key: req.file.key
  });
});

//update doc
router.patch("/:id", (req, res, next) => {
  console.log("REQ.BODY -->", req.body);
  let { label, type, text, fileUrl, key } = req.body;
  const update = { fileUrl, label, type, text, key };
  Document.findByIdAndUpdate(req.params.id, update)
    .then(updated => {
      res.json({
        message: "Documents were updated successfully",
        updated
      });
    })
    .catch(error => next(error));
});

//create random url, connected users will be able to see saved items
router.post("/old", uploadCloud.single("doc"), (req, res, next) => {
  console.log("User --->", req.user);
  let { label, type, text } = req.body;

  let data = { label, type, text };
  if (req.file) {
    data.publicId = req.file.public_id;
    console.log("DEBUG data.publicId", data.publicId);

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

//delete docs if we upload wrong
router.delete("/:id", (req, res, next) => {
  let docId = req.params.id;

  Document.findByIdAndRemove(docId)
    .then(document => {
      var params = {
        Bucket: "enigma-cipher",
        Key: document.key
      };
      s3.deleteObject(params, (err, data) => {
        res.json({
          success: !err,
          err,
          document
        });
      });
    })
    .catch(err => next(err));
});

module.exports = router;

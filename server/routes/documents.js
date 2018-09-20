const express = require("express");
const Document = require("../models/Document");

const router = express.Router();

//create docs
router.get("/", (req, res, next) => {
  res.json({
    message: "hi"
  });
});

//file upload
router.post("/", (req, res, next) => {
  let { label, type, text } = req.body;
  Document.create({ label, type, text })
    .then(document => {
      res.json(document);
    })
    .catch(err => next(err));
});

//generate get document list
// router.post("/vaults");

// //get docs from the other user
// router.get("/:id/:random");

// //delete document from db
// router.delete("/:id/:random");

// //delete docs if he uploads wrong docs
// router.delete("/delete/:id");

module.exports = router;

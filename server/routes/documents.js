const express = require("express");
const Document = require("../models/Document");

const router = express.Router();

// router.post("/api/upload", (req, res, next) => {
//   Document.find()
//     .then(documents => {
//       res.json(documents);
//     })
//     .catch(err => next(err));
// });

//read document
router.get("/", (req, res, next) => {
  Document.find()
    .then(documents => {
      res.json(documents);
    })
    .catch(err => next(err));
});

//update or edit document
// router.post("");

//delete document
// router.delete("/");

module.exports = router;

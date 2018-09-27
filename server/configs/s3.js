require("dotenv").config();

// Require multer for image uploading and multers3 to upload directly to s3
var multer = require("multer");
var multerS3 = require("multer-s3");

// Configure aws s3 SDK (update authentication)
var AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET
});
var s3 = new AWS.S3();

// Unique name of aws s3 bucket created
const myBucket = "enigma-cipher";

// Multer upload (Use multer-s3 to save directly to AWS instead of locally)
var uploadCloud = multer({
  storage: multerS3({
    s3: s3,
    bucket: myBucket,
    // Set public read permissions
    acl: "public-read",
    // Auto detect contet type
    serverSideEncryption: "AES256",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    // Set key/ filename as original uploaded name
    key: function(req, file, cb) {
      cb(null, "file" + Math.floor(Math.random() * 1000000000));
      // cb(null, file.originalname);
    }
  })
});

module.exports = uploadCloud;

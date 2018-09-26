const cloudinary = require("cloudinary");

require("../configs/cloudinary");

console.log(cloudinary.v2.uploader.destroy);

cloudinary.v2.uploader.destroy(
  "my-app-files/g3q29o0j7npal7izicti",
  { invalidate: true },
  (error, result) => {
    console.log(result, error);
  }
);

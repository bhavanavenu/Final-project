const cloudinary = require("cloudinary");

require("../configs/cloudinary");

console.log(cloudinary.v2.uploader.destroy);

cloudinary.v2.uploader.destroy(
  "my-app-files/w1h2td1sp9q4keclg7s5",
  { invalidate: true },
  (error, result) => {
    console.log(result, error);
  }
);

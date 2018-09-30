// Nodejs encryption with CTR
import * as CryptoJS from "crypto-js";
var randomstring = require("randomstring");

const algorithm = "aes-256-ctr";

export default {
  algorithm: algorithm,
  generateRandomKey() {
    return randomstring.generate();
  },

  encrypt(text, key) {
    return CryptoJS.AES.encrypt(text, key).toString();
  },
  decrypt(text, key) {
    var bytes = CryptoJS.AES.decrypt(text.toString(), key);
    return bytes.toString(CryptoJS.enc.Utf8);
  },
  encryptFile(file, key) {},
  decryptFile(file, key) {}
};

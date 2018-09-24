// Part of https://github.com/chris-rock/node-crypto-examples

// Nodejs encryption with CTR
import * as CryptoJS from "crypto-js";

const algorithm = "aes-256-ctr";

export default {
  algorithm: algorithm,
  generateRandomKey() {
    return "chartreuse";
  },
  encrypt(text, key) {
    return CryptoJS.AES.encrypt(text, key).toString();
    // var cipher = crypto.createCipher(algorithm, key);
    // var crypted = cipher.update(text, "utf8", "hex");
    // crypted += cipher.final("hex");
    // return crypted;
  },
  decrypt(text, key) {
    var bytes = CryptoJS.AES.decrypt(text.toString(), key);
    return bytes.toString(CryptoJS.enc.Utf8);
    // var decipher = crypto.createDecipher(algorithm, key);
    // var dec = decipher.update(text, "hex", "utf8");
    // dec += decipher.final("utf8");
    // return dec;
  },
  encryptFile(file, key) {},
  decryptFile(file, key) {}
};

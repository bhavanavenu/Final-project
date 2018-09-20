const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vaultSchema = new Schema({
  randomUrl: String,
  _document: mongoose.Schema.Types.ObjectId
});

const Vault = mongoose.model("Vault", vaultSchema);
module.exports = Vault;

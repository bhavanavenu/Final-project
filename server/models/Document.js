const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  label: {
    type: String,

    default: ""
  },
  type: {
    type: String,
    required: true,
    enum: ["TEXT", "FILE"],
    default: "TEXT"
  },
  text: {
    type: String,

    default: ""
  },
  fileUrl: {
    type: String,
    default: ""
  },
  key: String,

  _owner: { type: Schema.Types.ObjectId, ref: "User" }
});

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  label: {
    type: String,
    // required: true,
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
    // required: true,
    default: ""
  },
  fileUrl: {
    type: String,
    default: ""
  },
  public_id: String,
  // randomUrl: {
  //   type: String
  // },
  _owner: { type: Schema.Types.ObjectId, ref: "User" }
});

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;

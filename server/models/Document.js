const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ["TEXT", "FILE"]
  },
  text: {
    type: String
    //required: true
  },
  fileUrl: {
    type: String
  },
  randomUrl: {
    type: String
  },
  _owner: { type: Schema.Types.ObjectId, ref: "User" }
});

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;

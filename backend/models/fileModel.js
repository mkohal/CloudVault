const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  path: String,
  originalname: String,
  public_id: String,
  format: String,
  user: {
    type: mongoose.Schema.Types.ObjectId, // means isme user ki id ayegi
    ref: "users", // vo user pda hoga Users collection mai isliye uska refrence dena padega
  },
});

const file = mongoose.model("file", fileSchema);

module.exports = file;

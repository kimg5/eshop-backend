const mongoose = require("mongoose");
const ColorSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  }
});
const Color = mongoose.model("Color", ColorSchema);
module.exports = Color;

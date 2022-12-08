const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String
  },
  email: {
    type: String,
    required: true,
  },
  card: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },  
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
const mongoose = require("mongoose");

//try renmoving require from ths  since its already in index.js

//eg from moongose website var Tank = mongoose.model('Tank', yourSchema);

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        default: "user"
      }
    ]
  })
);

module.exports = User;

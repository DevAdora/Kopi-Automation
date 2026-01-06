// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const config = require("../config/database");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    collection: "users",
  }
);

UserSchema.methods.saveUser = function () {
  return this.save();
};

UserSchema.statics.findByUsername = async function (username) {
  return this.findOne({ username });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.statics.getUserById = async function (id) {
  console.log(id, "MODEL");
  return this.findOne({ _id: id });
  // return this.findOne({id});
};

const User = mongoose.model("User", UserSchema);

module.exports = User;

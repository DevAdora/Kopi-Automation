const mongoose = require("mongoose");

const UserDetailSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    image: String,
    userType: String,
    email: { type: String, unique: true },
  },
  {
    collection: "users",
  }
);
mongoose.model("users", UserDetailSchema);

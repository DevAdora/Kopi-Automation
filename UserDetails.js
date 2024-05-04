const mongoose = require("mongoose");

const UserDetailSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  {
    collection: "users",
  }
);
mongoose.model("users", UserDetailSchema);

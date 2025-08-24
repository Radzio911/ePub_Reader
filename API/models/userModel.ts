import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

export const User = mongoose.model("User", userSchema, "users");

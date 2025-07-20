import mongoose from "mongoose";

export const bookSchema = new mongoose.Schema({
  title: String,
  file: String,
  category: String,
  user: { type: mongoose.Types.ObjectId, ref: "User" },
});
export const Book = mongoose.model("Book", bookSchema, "books");

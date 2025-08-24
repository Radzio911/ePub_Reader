import { auth } from "./middle.ts";
import express, { response } from "express";
import { User } from "./models/userModel.ts";
import md5 from "md5";
import mongoose from "mongoose";
import JWT from "jsonwebtoken";
import { Book } from "./models/bookModel.ts";
import formData from "express-form-data";
import fs from "fs";
import { v4 } from "uuid";
import { extractCover } from "./utils.ts";
import cors from "cors";

const app = express();

mongoose.connect("mongodb://root:example@localhost:27016/Book");

const secretToken: string = "dhashdkgsvbcxjkm098ur3uyhusgfjdbkjkjcx";
app.use(express.json());
app.use(auth(secretToken));
app.use(cors())

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  const user = await User.create({
    username,
    password: md5(password),
    email,
  });
  res.json({ id: user._id });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    username: username,
    password: md5(password),
  });
  if (user) {
    const token = JWT.sign({ id: user._id }, secretToken);
    res.json({ token: token, loginin: true });
  } else {
    res.json({ loginin: false });
  }
});

app.get("/my-books", async (req, res) => {
  const user = await User.findById(req.user);
  if(user){  const myBooks = await Book.find({ user });
  res.json({ books: myBooks });}
  else{res.status(401).json({})}
});

app.get("/search-book-titles", async (req, res) => {
  const { query } = req.query;
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${query}`
  );
  const data = await response.json();
  const titles = data.docs.map((doc: any) => doc.title);
  res.json({ titles });
});

app.delete("/delete-my-book", async (req, res) => {
  const { id } = req.query;
  const book = await Book.findById(id);
  const user = await User.findById(req.user);

  if ((book?.user as any).toHexString() != user?._id.toHexString()) {
    res.json({ error: "That book is not yours!" });
    return;
  }

  if(book?.file){

    fs.rmSync(book.file)
  }

  await Book.findByIdAndDelete(id);

  res.json({ deleted: true });
});

app.post("/new-book", formData.parse(), async (req, res) => {
  const { title, category } = req.body;
  const { epub } = req.files;
  const user = await User.findById(req.user);
  const file = `files/${v4()}.epub`;
  fs.copyFileSync(epub.path, file);
  const book = await Book.create({ category, file, title, user });
  extractCover(file, `covers/${book._id}.jpg`);
  res.json({ id: book._id });
});

app.get("/book-file/file.epub", async (req, res) => {
  const { id } = req.query;
  console.log(id)
  const book = await Book.findById(id);
  if(book?.file){
    res.sendFile(book.file, { root: "." });
  }
  else {res.json({error: "File not found" })}
});

app.get("/cover", async (req, res) => {
  const { id } = req.query;
  res.sendFile(`covers/${id}.jpg`, { root: "." });
});

app.listen(5555);

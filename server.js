const express = require('express');
const app = express();
const mongoose = require("mongoose");
const PORT = 3000;
const Thread = require("./models/Thread")

app.use(express.json());
app.use(express.static("public"));


const ID = process.env.MONGO_DB_ID;
const PASS = process.env.MONGO_DB_PASSWORD;
mongoose
  .connect(
    `mongodb+srv://${ID}:${PASS}@cluster0.vd6gg62.mongodb.net/threads?retryWrites=true&w=majority`
  )
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

//getメソッド
app.get("/api/v1/threads", async(req, res) => {
  try{
    const allThreads = await Thread.find({});
    res.status(200).json(allThreads);
  } catch {
    console.log(err);
  }
});

//postメソッド
app.post("/api/v1/thread", async(req, res) => {
  try{
    const createThread = await Thread.create(req.body);
    res.status(200).json(createThread);
  } catch {
    console.log(err);
  }
});

app.listen(PORT, console.log("server running"));
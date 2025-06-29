const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Routers
//upload file
const uploadFile = require("./routers/uploadFile");
app.use("/upload", uploadFile);

//get file
const getUploadedFile = require("./routers/getUploadedFile");
const { clearCacheFolder } = require("./handlers/clearCacheFolder");
app.use("/file", getUploadedFile);

//get file link
const getUploadedFileLink = require("./routers/getUploadedFileLink");
app.use("/link", getUploadedFileLink);

//delete cache folder
setInterval(() => {
  console.log("Clearing cache folder...");
  clearCacheFolder();
}, 1000 * 60 * 60);

// bot.on("message", (msg) => {
//   bot.sendMessage(msg.chat.id, `Hello 👋${msg.chat.id}`);
// });

app.listen(port, () => {
  console.log(`Example app listening on port https://localhost:${port}`);
});

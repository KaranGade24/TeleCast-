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

//upload file
const uploadFile = require("./routers/uploadFile");
const { bot } = require("./config/botConnection");
app.use("/upload", uploadFile);

//get file
const getUploadedFile = require("./routers/getUploadedFile");
const { clearCacheFolder } = require("./handlers/clearCacheFolder");
app.use("/file", getUploadedFile);

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

// 1BQANOTEuMTA4LjU2LjE5MQG7XXBP+UtZISisx4q9QJJ/66rCRuMmhlDYBIG6NN8Iu1xZCiAKPuWezKBe5xWiJAeyQOdUBBd0oKx+aj/s1h6gdOl3qg35HjCYTz/fLEOJo4bo45VNfic3vtrq5I9E3X48Bw6Qv/ZpmIE5HwUoj4SM79Dn5+ayB7qLVjcWnFCwXaAfIA+iGL/2QkYEAfhdYxPZrKHuFApmVezQIJzo/9Df6y9s5o+mPlOZyZNzk8rLOCCd2700FyZzc7kijKpXFw7yf7p4JTvN9OAvmj722nx4oCS3OqQcgToT/ur0p7+n//dM8lX08IvVDAOG+Kn4dKMtsVdt2/e/cziG2E7dsYNoIA==

// const { TelegramClient } = require("telegram");
// const { StringSession } = require("telegram/sessions");
// const { Api } = require("telegram");
// const input = require("input");
// const fs = require("fs");
// require("dotenv").config();

// const apiId = process.env.API_ID;
// console.log({ apiId });
// const apiHash = process.env.API_HASH;
// const stringSession = new StringSession(process.env.SESSION); // <-- empty or saved session

// (async () => {
//   const client = new TelegramClient(stringSession, apiId, apiHash, {
//     connectionRetries: 5,
//   });

//   await client.start({
//     phoneNumber: async () => await input.text("Phone number: "),
//     password: async () => await input.text("Password (if enabled): "),
//     phoneCode: async () => await input.text("Enter the code: "),
//     onError: (err) => console.log(err),
//   });

//   console.log("Logged in as user!");
//   console.log("Session:", client.session.save()); // Save this for reuse

//   // Send a message to your bot
//   const botUsername = "https://t.me/sjjdjrgc27"; // without @
//   await client.sendMessage(botUsername, {
//     message: "📩 Hello from user via GramJS!",
//   });

//   // Send a file to the bot (if bot can receive)
//   const result = await client.sendFile(botUsername, {
//     file: "./CrazyTaxi.apk",
//     progressCallback: uploadProgress,
//     // Path to your file
//     caption: "📎 PDF from GramJS user",
//     forceDocument: true,
//   });
//   console.log(result.id);
//   console.log("✅ Message and file sent to bot.");
// })();

// function formatBytes(bytes) {
//   const units = ["B", "KB", "MB", "GB", "TB"];
//   let i = 0;
//   while (bytes >= 1024 && i < units.length - 1) {
//     bytes /= 1024;
//     i++;
//   }
//   return `${bytes.toFixed(2)} ${units[i]}`;
// }

// function uploadProgress(sentBytes, totalBytes) {
//   const total = totalBytes || 1; // prevent division by zero
//   const percent = ((sentBytes / total) * 100).toFixed(2);
//   const sentFormatted = formatBytes(sentBytes);
//   const totalFormatted = formatBytes(total);
//   process.stdout.write(
//     `\r📤 Uploading: ${percent}% (${sentFormatted} / ${totalFormatted})`
//   );
// }

// const TelegramBot = require("node-telegram-bot-api");

// const BOT_TOKEN = process.env.BOT_TOKEN;
// const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// bot.on("message", (msg) => {
//   if (msg.document) {
//     const fileId = msg.document.file_id;
//     const fileName = msg.document.file_name;
//     console.log("📎 Received file:", fileName);
//     console.log("🆔 File ID:", fileId);
//   } else {
//     console.log("❌ No document received.");
//   }
// });

// // BQACAgUAAxkBAAP8aF_euqFbWIY_iq5bsv6Jq0TRt80AAt8XAAKl3gFXL4U1xQLUZ6Y2BA

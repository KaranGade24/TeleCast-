const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { bot } = require("../config/botConnection");
const { getFilePathWithRetry } = require("../handlers/fileUploadToTelegram");
const { FileMetadata } = require("../model/uploadedFileMetadata");

exports.getUploadedFile = async (req, res) => {
  const BOT_TOKEN = process.env.BOT_TOKEN;

  try {
    const fileMeta = await FileMetadata.findById(req.params.id);
    if (!fileMeta) return res.status(404).json({ error: "File not found" });

    const fileId = fileMeta.telegramFileId;

    const cacheDir = path.join(__dirname, "cache");
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir);
    }

    const filePath = path.join(cacheDir, `${fileMeta._id}.dat`);
    if (fs.existsSync(filePath)) {
      return fs.createReadStream(filePath).pipe(res);
    }

    const telegramUrl = await getFilePathWithRetry(fileId, BOT_TOKEN, bot);
    console.log({ telegramUrl });

    // 2. Stream file to client
    const tgResponse = await axios({
      method: "GET",
      url: telegramUrl,
      responseType: "stream",
    });

    const writeStream = fs.createWriteStream(filePath);
    tgResponse.data.pipe(writeStream);

    writeStream.on("finish", () => {
      fs.createReadStream(filePath).pipe(res);
    });

    // res.setHeader(
    //   "Content-Disposition",
    //   `inline; filename="${fileMeta.originalname}"`
    // );
    // res.setHeader("Content-Type", fileMeta.mimeType);

    // // ✅ Pipe stream
    // tgResponse.data.pipe(res);
  } catch (error) {
    console.error("Error in /file/:id:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

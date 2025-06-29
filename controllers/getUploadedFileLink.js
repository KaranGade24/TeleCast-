const { bot } = require("../config/botConnection");
const { getFilePathWithRetry } = require("../handlers/fileUploadToTelegram");
const { FileMetadata } = require("../model/uploadedFileMetadata");

exports.getUploadedFileLink = async (req, res) => {
  const BOT_TOKEN = process.env.BOT_TOKEN;

  try {
    const fileMeta = await FileMetadata.findById(req.params.id);
    if (!fileMeta) return res.status(404).json({ error: "File not found" });

    const fileId = fileMeta.telegramFileId;

    const telegramUrl = await getFilePathWithRetry(fileId, BOT_TOKEN, bot);
    console.log({ telegramUrl });
    res.json(telegramUrl);
  } catch (error) {
    console.error("Error in /file/:id:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const { bot } = require("../config/botConnection");
const {
  sendDynamicFileToTelegram,
  getFilePathWithRetry,
} = require("../handlers/fileUploadToTelegram");
const { FileMetadata } = require("../model/uploadedFileMetadata");

exports.uploadFile = async (req, res) => {
  try {
    const BOT_TOKEN = process.env.BOT_TOKEN;

    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    console.log("Received file:", req.file.originalname, req.file.mimetype);
    const chatId = process.env.CHAT_ID;

    // 1. Dynamically send the file
    const telegramMessage = await sendDynamicFileToTelegram(
      bot,
      chatId,
      req.file
    );
    console.log({ telegramMessage });

    // 2. Extract file_id
    const file_id =
      telegramMessage.document?.file_id ||
      telegramMessage.video?.file_id ||
      telegramMessage.audio?.file_id ||
      telegramMessage.photo?.slice(-1)[0]?.file_id ||
      telegramMessage.voice?.file_id ||
      telegramMessage.animation?.file_id;

    console.log({ file_id });
    if (!file_id) {
      return res.status(500).json({ error: "Unable to extract file_id" });
    }

    // 3. Get file download link
    const download_url = await getFilePathWithRetry(file_id, BOT_TOKEN, bot);
    console.log({ download_url });

    const file_size = formatFileSize(req.file.size);

    const fileMetadata = new FileMetadata({
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: file_size,
      url: download_url,
      telegramFileId: file_id,
    });

    await fileMetadata.save();
    const permenant_URL = `${process.env.API}/file/${fileMetadata._id}`;

    res.json({
      message: "✅ File uploaded successfully!",
      fileMetadata: {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: file_size,
        permenant_URL,
        tempory_URL: download_url,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
  return `${size} ${sizes[i]}`;
}

const sendDynamicFileToTelegram = async (bot, chatId, file) => {
  try {
    const { mimetype, originalname, buffer } = file;

    const options = {
      caption: `📎 ${originalname}`,
      filename: originalname,
      contentType: mimetype,
    };

    // Auto route to appropriate send method
    const is = (type) => mimetype.startsWith(type);

    if (is("video/")) {
      return await bot.sendVideo(chatId, buffer, options);
    } else if (is("image/")) {
      return await bot.sendPhoto(chatId, buffer, options);
    } else if (is("audio/")) {
      // OGG = voice, others = audio
      if (mimetype === "audio/ogg") {
        return await bot.sendVoice(chatId, buffer, options);
      } else {
        return await bot.sendAudio(chatId, buffer, options);
      }
    } else if (mimetype === "image/gif" || originalname.endsWith(".gif")) {
      return await bot.sendAnimation(chatId, buffer, options);
    } else {
      // fallback to document for unknown file types
      return await bot.sendDocument(chatId, buffer, options);
    }
  } catch (error) {
    console.error("❌ Error sending file to Telegram:", error.message);
    throw error;
  }
};

const getFilePathWithRetry = async (file_id, botToken, bot) => {
  try {
    const fileInfo = await bot.getFile(file_id);
    const downloadLink = `https://api.telegram.org/file/bot${botToken}/${fileInfo.file_path}`;

    return downloadLink;
  } catch (error) {
    console.error("❌ Error retrieving file path:", error.message);
    throw error;
  }
};

module.exports = { sendDynamicFileToTelegram, getFilePathWithRetry };

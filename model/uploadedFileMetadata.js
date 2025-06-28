const mongoose = require("mongoose");

const fileMetadataSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  telegramFileId: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

const FileMetadata = mongoose.model("FileMetadata", fileMetadataSchema);

module.exports = { FileMetadata };

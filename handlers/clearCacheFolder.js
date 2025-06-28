const fs = require("fs");
const path = require("path");

const cacheDir = path.join(__dirname, "../controllers/cache");

function clearCacheFolder() {
  fs.readdir(cacheDir, (err, files) => {
    if (err) return console.error("❌ Error reading cache directory:", err);

    for (const file of files) {
      const filePath = path.join(cacheDir, file);
      fs.unlink(filePath, (err) => {
        if (err) console.error(`❌ Error deleting file ${filePath}:`, err);
        else console.log(`🧹 Deleted: ${filePath}`);
      });
    }
  });
}

module.exports = { clearCacheFolder };

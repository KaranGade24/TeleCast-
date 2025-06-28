const express = require("express");
const { uploadFile } = require("../controllers/uploadFile");
const { upload } = require("../config/multerStorage");
const router = express.Router();

router.post("/", upload.single("file"), uploadFile);

module.exports = router;

const express = require("express");
const { getUploadedFile } = require("../controllers/getUploadedFile");
const router = express.Router();

router.get("/:id", getUploadedFile);

module.exports = router;

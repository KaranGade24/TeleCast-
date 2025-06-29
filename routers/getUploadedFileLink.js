const exress = require("express");
const { getUploadedFileLink } = require("../controllers/getUploadedFileLink");
const router = exress.Router();

router.get("/:id", getUploadedFileLink);

module.exports = router;

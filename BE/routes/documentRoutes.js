const express = require("express");
const multer = require("multer");
const { uploadDocument } = require("../controllers/documentController");
const { validateUpload } = require("../middleware/validationMiddleware");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("document"), validateUpload, uploadDocument);

module.exports = router;

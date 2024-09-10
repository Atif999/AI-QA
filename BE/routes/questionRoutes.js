const express = require("express");
const { askQuestion } = require("../controllers/questionController");
const { validateQuestion } = require("../middleware/validationMiddleware");

const router = express.Router();

router.post("/", validateQuestion, askQuestion);

module.exports = router;

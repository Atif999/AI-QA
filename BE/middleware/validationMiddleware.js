const { body, validationResult } = require("express-validator");

const validateUpload = [
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }
    next();
  },
];

const validateQuestion = [
  body("question").notEmpty().withMessage("Question is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateUpload,
  validateQuestion,
};

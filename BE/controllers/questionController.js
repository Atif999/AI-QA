const { getAnswerFromAI } = require("../services/aiService");
const {
  formulatePrompt,
  retrieveFromPinecone,
} = require("../utilities/utilites");

async function askQuestion(req, res, next) {
  try {
    const { question } = req.body;
    const relevantChunks = await retrieveFromPinecone(question);
    const prompt = formulatePrompt(question, relevantChunks);
    const answer = await getAnswerFromAI(prompt);

    res.json({ answer });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  askQuestion,
};

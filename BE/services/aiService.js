const axios = require("axios");

async function getAnswerFromAI(prompt) {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY_OPENAI}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.choices[0].message.content;
}

module.exports = {
  getAnswerFromAI,
};

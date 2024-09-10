const axios = require("axios");
require("dotenv").config();

function chunkText(text, chunkSize = 500) {
  const chunks = [];
  const sentences = text.match(/[^.!?]+[.!?]+[\])'"`’”]*|.+/g);

  let currentChunk = "";

  for (let sentence of sentences) {
    if ((currentChunk + sentence).length > chunkSize) {
      chunks.push(currentChunk.trim());
      currentChunk = "";
    }
    currentChunk += sentence + " ";
  }

  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

async function generateEmbeddings(chunks) {
  const embeddings = [];

  for (const chunk of chunks) {
    const response = await axios.post(
      "https://api.openai.com/v1/embeddings",
      {
        model: "text-embedding-ada-002",
        input: chunk,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY_OPENAI}`,
          "Content-Type": "application/json",
        },
      }
    );
    embeddings.push({
      chunk,
      vector: response.data.data[0].embedding,
    });
  }

  return embeddings;
}

async function storeInPinecone(embeddings, pinecone) {
  const index = pinecone.Index(process.env.PINECONE_INDEX);

  const upsertData = embeddings.map((embedding, id) => ({
    id: id.toString(),
    values: embedding.vector,
    metadata: { text: embedding.chunk },
  }));

  await index.upsert({
    vectors: upsertData,
  });
}

async function retrieveFromPinecone(question, pinecone) {
  const index = pinecone.Index(process.env.PINECONE_INDEX);

  const response = await axios.post(
    "https://api.openai.com/v1/embeddings",
    {
      model: "text-embedding-ada-002",
      input: question,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY_OPENAI}`,
        "Content-Type": "application/json",
      },
    }
  );

  const questionEmbedding = response.data.data[0].embedding;

  const queryResult = await index.query({
    topK: 5,
    vector: questionEmbedding,
    includeMetadata: true,
  });

  return queryResult.matches.map((match) => match.metadata.text);
}

function formulatePrompt(question, chunks) {
  const context = chunks.join("\n");
  return `Context: ${context}\n\nQuestion: ${question}\n\nAnswer:`;
}

module.exports = {
  chunkText,
  formulatePrompt,
  storeInPinecone,
  retrieveFromPinecone,
  generateEmbeddings,
};

const { Pinecone } = require("@pinecone-database/pinecone");

let pineconeIndex;

async function initializePinecone() {
  const pinecone = new Pinecone({
    apiKey: process.env.API_KEY_PINCEONE,
  });

  pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);
}

module.exports = {
  initializePinecone,
};

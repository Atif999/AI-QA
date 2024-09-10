const { Pinecone } = require("@pinecone-database/pinecone");

let pineconeIndex;

async function initializePinecone() {
  const pinecone = new Pinecone({
    apiKey: process.env.API_KEY_PINCEONE, // You can connect to PINECONE database when you have the API_KEY for PINECONE
  }); //and store data in database

  pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);
}

module.exports = {
  initializePinecone,
};

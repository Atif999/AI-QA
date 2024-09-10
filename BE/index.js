require("dotenv").config();
const express = require("express");
const documentRoutes = require("./routes/documentRoutes");
const questionRoutes = require("./routes/questionRoutes");
const { initializePinecone } = require("./services/pineconeService");
const {
  errorHandlingMiddleware,
} = require("./middleware/errorHandlingMiddleware");

const app = express();
app.use(express.json());

initializePinecone()
  .then(() => {
    console.log("Pinecone index initialized");
  })
  .catch((err) => {
    console.error("Failed to initialize Pinecone index:", err);
    process.exit(1);
  });

app.use("/upload", documentRoutes);
app.use("/ask", questionRoutes);

app.use(errorHandlingMiddleware);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

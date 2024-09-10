const fs = require("fs");
const pdfParse = require("pdf-parse");
const { exec } = require("child_process");
const {
  chunkText,
  generateEmbeddings,
  storeInPinecone,
} = require("../utilities/utilites");

async function uploadDocument(req, res, next) {
  try {
    let text = "";
    if (req.file.mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(req.file.path);
      text = (await pdfParse(dataBuffer)).text;
    } else {
      text = fs.readFileSync(req.file.path, "utf-8");
    }

    const chunks = chunkText(text);
    const embeddings = await generateEmbeddings(chunks);
    await storeInPinecone(embeddings);

    const tempFilePath = "./temp_document.txt";
    fs.writeFileSync(tempFilePath, text);

    exec(
      `python3 path/to/your/topic_modeling_script.py ${tempFilePath}`,
      (err, stdout, stderr) => {
        fs.unlinkSync(tempFilePath);

        if (err) {
          console.error(`Error executing Python script: ${stderr}`);
          next(err);
          return;
        }
        console.log(`Python script output: ${stdout}`);
        res.json({
          message: "Document processed successfully with topics extracted.",
        });
      }
    );
  } catch (error) {
    next(error);
  }
}

module.exports = {
  uploadDocument,
};

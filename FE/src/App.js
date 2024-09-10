import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [document, setDocument] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("document", document);

    try {
      const response = await axios.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Document uploaded successfully!");
    } catch (error) {
      alert("Failed to upload document");
      console.error(error);
    }
  };

  const handleAsk = async () => {
    try {
      const response = await axios.post("/ask", { question });
      setAnswer(response.data.answer);
    } catch (error) {
      alert("Failed to get answer");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">AI-Enhanced Document QA System</h1>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Upload Document</h5>
          <input
            type="file"
            className="form-control mb-3"
            onChange={(e) => setDocument(e.target.files[0])}
          />
          <button
            className="btn btn-primary w-100"
            onClick={handleUpload}
            disabled={!document}
          >
            Upload Document
          </button>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Ask a Question</h5>
          <input
            type="text"
            className="form-control mb-3"
            value={question}
            placeholder="Enter your question here..."
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            className="btn btn-success w-100"
            onClick={handleAsk}
            disabled={!question}
          >
            Get Answer
          </button>
        </div>
      </div>

      {answer && (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">Answer</h5>
            <p className="card-text">{answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

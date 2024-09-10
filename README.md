**AI-Enhanced Document QA System**
This project is an AI-powered question-answering system that ingests documents, extracts relevant information, and answers
questions based on the content of those documents. It leverages advanced AI models and vector databases like Pinecone for efficient information retrieval.

**Table of Contents**
Features
Technologies Used
Project Structure
Setup and Installation
Environment Variables
Running the Backend
Running the Frontend


**Technologies Used**
Backend: Node.js, Express, Pinecone, GPT-4 API, Python (for topic modeling)
Frontend: React, Bootstrap, Axios
Database: Pinecone (vector database)
Other: Multer (file handling), pdf-parse (PDF text extraction), dotenv (environment variables)


**Setup and Installation**

**1. Clone the Repository**

git clone https://github.com/Atif999/AI-QA.git
cd AI-QA

**2. Backend Setup**
Navigate to the backend directory:
cd BE

**Install the dependencies:**
npm install


**3. Frontend Setup**
Navigate to the frontend directory:
cd FE

**Install the dependencies:**
npm install

**4. Python Setup**
Ensure you have Python installed (preferably Python 3).

Install the required Python packages:
pip install nltk scikit-learn pinecone-client

**5. Environment Variables**
In the backend directory add the keys to the respective variable in .env file for OPEN AI and PINECONE

**6. Running the Backend**
Navigate to the backend directory:
cd BE
Start the server:
npm start

**7. Running the Frontend**
Navigate to the frontend directory:
cd FE
Start the React development server:
npm start
The frontend should be running on http://localhost:3000
   

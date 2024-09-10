**AI-Enhanced Document QA System**<br>
This project is an AI-powered question-answering system that ingests documents, extracts relevant information, and answers
questions based on the content of those documents. It leverages advanced AI models and vector databases like Pinecone for efficient information retrieval.

**Table of Contents**<br>
Features<br>
Technologies Used<br>
Project Structure<br>
Setup and Installation<br>
Environment Variables<br>
Running the Backend<br>
Running the Frontend<br>


**Technologies Used**<br>
Backend: Node.js, Express, Pinecone, GPT-4 API, Python (for topic modeling)<br>
Frontend: React, Bootstrap, Axios<br>
Database: Pinecone (vector database)<br>
Other: Multer (file handling), pdf-parse (PDF text extraction), dotenv (environment variables)<br>


**Setup and Installation**<br>

**1. Clone the Repository**<br>

git clone https://github.com/Atif999/AI-QA.git<br>
cd AI-QA<br>

**2. Backend Setup**<br>
Navigate to the backend directory:<br>
cd BE<br>

**Install the dependencies:**<br>
npm install<br>


**3. Frontend Setup**<br>
Navigate to the frontend directory:<br>
cd FE<br>

**Install the dependencies:**<br>
npm install<br>

**4. Python Setup**<br>
Ensure you have Python installed (preferably Python 3).<br>

Install the required Python packages:<br>
pip install nltk scikit-learn pinecone-client<br>

**5. Environment Variables**<br>
In the backend directory add the keys to the respective variable in .env file for OPEN AI and PINECONE<br>

**6. Running the Backend**<br>
Navigate to the backend directory:<br>
cd BE<br>
Start the server:<br>
npm start<br>

**7. Running the Frontend**<br>
Navigate to the frontend directory:<br>
cd FE<br>
Start the React development server:<br>
npm start<br>
The frontend should be running on http://localhost:3000<br>
   

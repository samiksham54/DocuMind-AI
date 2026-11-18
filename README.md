# DocuMind AI – AI-Powered Technical Document Analyzer

DocuMind AI is a web-based application designed to simplify technical document analysis. It allows users to upload PDF documents, extract text automatically, and prepare documents for AI-powered analysis.

## Features

- **PDF Upload:** Upload technical PDF documents through an interactive interface.
- **File Validation:** Validates PDF format, file signature and file size.
- **Text Extraction:** Extracts text from PDF documents using PyMuPDF.
- **Multi-page Processing:** Extracts text from all pages of uploaded documents.
- **Dashboard:** Displays document statistics and recent activity.
- **REST API:** Backend APIs developed using FastAPI.
- **AI Integration:** Gemini API integration planned for intelligent document summarization.

## Technology Stack

**Frontend:**
- React.js
- JavaScript
- CSS
- Vite

**Backend:**
- Python
- FastAPI
- PyMuPDF

**AI:**
- Google Gemini API (integration in progress)

**Development Tools:**
- Visual Studio Code
- Git
- GitHub

## Project Architecture

React Frontend → FastAPI Backend → PDF Processing → Text Extraction → AI Analysis (planned)

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/samiksham54/DocuMind-AI.git
cd DocuMind-AI
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
```

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the backend:

```bash
python -m uvicorn main:app --reload
```

Backend URL: http://127.0.0.1:8000

API Documentation: http://127.0.0.1:8000/docs

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: http://localhost:5173

## Project Status

The React frontend, PDF upload functionality, PDF validation and text extraction features have been implemented.

Gemini-powered summarization is under development.

## Developer

Developed as an independent full-stack development project to gain practical experience in web application development, backend API integration and applied AI.

**GitHub Repository:** https://github.com/samiksham54/DocuMind-AI

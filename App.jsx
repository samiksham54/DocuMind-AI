
import { useState } from "react";

import {
  FileText,
  LayoutDashboard,
  FolderOpen,
  MessageSquare,
  Settings,
  Bell,
  Search,
  UploadCloud,
  Sparkles,
  FileSearch,
  Clock,
  Trash2
} from "lucide-react";

import "./App.css";

function App() {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setError("");
    setAnalysis(null);

    if (file.type !== "application/pdf") {
      setError("Please select a PDF file.");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("PDF must be smaller than 10 MB.");
      event.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/upload-pdf",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "PDF processing failed.");
      }

      const newDocument = {
        id: Date.now(),
        name: data.filename,
        pages: data.total_pages,
        text: data.extracted_text
      };

      setDocuments((previous) => [
        newDocument,
        ...previous
      ]);

      setAnalysis(newDocument);

    } catch (err) {
      setError(err.message || "Unable to connect to backend.");
    } finally {
      setLoading(false);
      event.target.value = "";
    }
  };

  const removeDocument = (id) => {
    setDocuments((previous) =>
      previous.filter((doc) => doc.id !== id)
    );

    if (analysis?.id === id) {
      setAnalysis(null);
    }
  };

  return (
    <div className="app">

      <aside className="sidebar">
        <h2 className="logo">
          <Sparkles /> DocuMind AI
        </h2>

        <p className="menu-title">MENU</p>

        <nav>
          <a className="active"><LayoutDashboard /> Dashboard</a>
          <a><FolderOpen /> My Documents</a>
          <a><MessageSquare /> AI Assistant</a>
        </nav>

        <div className="sidebar-bottom">
          <a><Settings /> Settings</a>

          <div className="profile">
            <div className="avatar">SM</div>
            <div>
              <strong>Samiksha</strong>
              <small>Free Workspace</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">

        <header className="topbar">
          <div>
            <h2>Dashboard</h2>
            <p>Welcome back! Let's analyze your documents.</p>
          </div>

          <div className="top-actions">
            <button className="icon-btn"><Search /></button>
            <button className="icon-btn"><Bell /></button>
          </div>
        </header>

        <section className="welcome">
          <div>
            <span className="tag">
              <Sparkles size={14}/> AI DOCUMENT INTELLIGENCE
            </span>

            <h1>
              Understand documents
              <br />
              with the power of AI.
            </h1>

            <p>
              Upload your technical documents and let AI do the analysis.
            </p>
          </div>

          <FileSearch className="welcome-icon" />
        </section>

        <section className="stats">

          <div className="stat-card">
            <FileText />
            <p>Total Documents</p>
            <h2>{documents.length}</h2>
          </div>

          <div className="stat-card">
            <Sparkles />
            <p>AI Analyses</p>
            <h2>0</h2>
          </div>

          <div className="stat-card">
            <Clock />
            <p>Recent Activity</p>
            <h2>{documents.length ? "Active" : "Start now"}</h2>
          </div>

        </section>

        <section className="upload-section">

          <div className="section-heading">
            <h2>Upload Document</h2>
            <span>PDF files supported</span>
          </div>

          <div className="upload-box">

            <UploadCloud size={42} />

            <h3>Upload your technical document</h3>

            <p>Select a PDF to extract its text using AI-ready processing.</p>

            <label className="upload-btn">
              {loading ? "Processing..." : "Choose PDF"}

              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileUpload}
                hidden
                disabled={loading}
              />
            </label>

            <small>Maximum file size: 10 MB</small>

            {loading && <p>Extracting PDF text. Please wait...</p>}

            {error && <p className="upload-error">{error}</p>}

          </div>
        </section>

        {analysis && (
          <section className="recent-section">
            <div className="section-heading">
              <h2>Extracted Document Text</h2>
              <span>{analysis.pages} pages</span>
            </div>

            <div className="analysis-box">
              <h3>{analysis.name}</h3>
              <pre>{analysis.text}</pre>
            </div>
          </section>
        )}

        <section className="recent-section">

          <div className="section-heading">
            <h2>Recent Documents</h2>
            <span>{documents.length} documents</span>
          </div>

          {documents.length === 0 ? (

            <div className="empty-state">
              <FileText size={38} />
              <h3>No documents yet</h3>
              <p>Your uploaded documents will appear here.</p>
            </div>

          ) : (

            <div className="document-list">

              {documents.map((doc) => (

                <div className="document-item" key={doc.id}>

                  <FileText className="document-icon" />

                  <div className="document-info">
                    <strong>{doc.name}</strong>
                    <small>{doc.pages} pages · Processed successfully</small>
                  </div>

                  <button
                    className="delete-btn"
                    onClick={() => removeDocument(doc.id)}
                    title="Remove document"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>
    </div>
  );
}

export default App;

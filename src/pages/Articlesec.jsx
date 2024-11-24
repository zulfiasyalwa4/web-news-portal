import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { auth } from "../firebase/setup";
import { onAuthStateChanged } from "firebase/auth";
import MainLayout from "../layout/MainLayout";
import generateContent from "../gemini/index";

export default function SecArticle() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [output, setOutput] = useState("");
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    async function fetchArticle() {
      if (!articleId.trim()) {
        setError(new Error("Invalid article ID"));
        setLoading(false);
        return;
      }

      try {
        const cleanedArticleId = encodeURIComponent(articleId.trim());
        const response = await fetch(`http://localhost:5000/api/articles/${cleanedArticleId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch article");
        }
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [articleId]);

  useEffect(() => {
    const fetchContent = async () => {
      if (!article?.title) return;
      try {
        const contentOutput = await generateContent(`Insight on ${article.title} paragraph , 3 sentences bahasa indonesia`);
        setOutput(contentOutput);
      } catch (err) {
        console.error("Error generating content:", err);
      }
    };
    fetchContent();
  }, [article?.title]);

  const handleUserInput = async () => {
    if (!userInput.trim()) return;

    try {
      const response = await generateContent(`${userInput} ${article.title} paragraph  3 sentences`);
      setAiResponse(response);
    } catch (error) {
      console.error("Error generating AI response:", error);
      setAiResponse("Sorry, I couldn't process your request.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message || "An error occurred while loading the article."}</p>;
  }

  const photo = currentUser?.photoURL;
  const name = currentUser?.displayName;

  return (
    <MainLayout>
      <div className="container pt-4 mt-5 mb-5" style={{ paddingLeft: "180px", paddingRight: "180px" }}>
        <div className="mb-4">
          <span className="badge bg-primary">{article.category || "General"}</span>
          <h1 className="mt-3 fw-bold">{article.title}</h1>
          <div className="mt-3 d-flex align-items-center">
            <img
              src={article.profileImage}
              alt="Author"
              className="rounded-circle me-2"
              style={{ width: "40px", height: "40px" }}
            />
            <div>
              <span className="fw-bold">{article.authorName|| "Anonymous"}</span>
              <br />
              <small className="text-muted">
                {article.publishDate ? new Date(article.publishDate).toLocaleDateString() : "Unknown Date"}
              </small>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <img
            src={article.mainImage}
            alt="Article"
            className="h-auto img-fluid w-100 rounded-3"
            style={{ objectFit: "cover", aspectRatio: "16 / 9" }}
          />
        </div>
        <div className="mb-4">
          <p>{article.content}</p>
        </div>

        <div className="article-content">
          {article.sections &&
            article.sections.map((section, index) => (
              <div key={index}>
                <h3 className="fw-bold fs-4">{section.heading}</h3>
                <p>{section.text}</p>
              </div>
            ))}
          {article.blockquote && (
            <blockquote className="p-4 mt-4 rounded blockquote bg-light" style={{ fontStyle: "italic" }}>
              <p>&quot;{article.blockquote}&quot;</p>
            </blockquote>
          )}
          <div className="my-5 text-center">
            <img
              src={article.advertisementImage}
              alt="Advertisement"
              className="img-fluid"
              style={{ maxWidth: "750px" }}
            />
          </div>
        </div>

        {/* AI Insights Blockquote */}
        <div
          className="p-4 mt-4 rounded bg-light position-relative"
          style={{
            fontStyle: "italic",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderLeft: "4px solid #007bff",
            backgroundImage: "linear-gradient(135deg, #e9ecef 0%, #f8f9fa 100%)",
          }}
        >
          <h5 className="text-primary">AI Insight</h5>
          <p
            style={{
              fontSize: "1.2rem",
              lineHeight: "1.6",
              color: "#343a40",
              textAlign: "justify",
              margin: 0,
            }}
          >
            &quot;{output}&quot;
          </p>
          <div
            style={{
              fontSize: "0.9rem",
              fontWeight: "bold",
              color: "#007bff",
              textAlign: "right",
              marginTop: "10px",
            }}
          >
            — by Gemini AI
          </div>
          <i
            className="bi bi-lightbulb-fill position-absolute"
            style={{
              fontSize: "2rem",
              color: "#ffc107",
              top: "-10px",
              left: "-10px",
            }}
          ></i>
        </div>

        {/* User Input Section */}
        <div className="mt-5">
          <h3 className="mb-3">Ask Gemini AI</h3>
          <div className="mb-3 input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Ask something about the article..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleUserInput}>
              Submit
            </button>
          </div>
          {aiResponse && (
            <div className="p-3 mt-3 rounded bg-light">
              <h5 className="text-primary">AI Response:</h5>
              <p>{aiResponse}</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

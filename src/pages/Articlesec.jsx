import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { auth } from "../firebase/setup";
import { onAuthStateChanged } from "firebase/auth";
import MainLayout from "../layout/MainLayout";


export default function SecArticle() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  const photo = currentUser?.photoURL;
  const name = currentUser?.displayName;

  

  useEffect(() => {
    async function fetchArticle() {
      if (!articleId.trim()) {
        setError(new Error("Invalid article ID"));
        setLoading(false);
        return;
      }

      try {
        const cleanedArticleId = encodeURIComponent(articleId.trim());
console.log("Fetching article with ID:", cleanedArticleId);  // Add this line to check the URL.
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message || "An error occurred while loading the article."}</p>;
  }

  
  return (
    <MainLayout>
    <div className="container pt-4 mt-5 mb-5" style={{ paddingLeft: "180px", paddingRight: "180px" }}>
      {/* Article Header */}
      <div className="mb-4">
        <span className="badge bg-primary">{article.category || "General"}</span>
        <h1 className="mt-3 fw-bold">{article.title}</h1>
        <div className="mt-3 d-flex align-items-center">
          <img
            src={photo}
            alt="Author"
            className="rounded-circle me-2"
            style={{ width: "40px", height: "40px" }}
          />
          <div>
            <span className="fw-bold">{name || "Anonymous"}</span>
            <br />
            <small className="text-muted">
              {article.publishDate ? new Date(article.publishDate).toLocaleDateString() : "Unknown Date"}
            </small>
          </div>
        </div>
      </div>

      {/* Article Image */}
      <div className="mb-4">
  <img
    src={article.mainImage}
    alt="Article"
    className="h-auto img-fluid w-100 rounded-3"  // Bootstrap classes for styling
    style={{ objectFit: "cover", aspectRatio: "16 / 9" }}
  />
</div>
<div className="mb-4">
  <p>{article.content}</p>
</div>


      {/* Article Content */}
      <div className="article-content">
        {article.sections && article.sections.map((section, index) => (
          <div key={index}>
            <h3 className="fw-bold fs-4">{section.heading}</h3>
            <p>{section.text}</p>
          </div>
        ))}

        {/* Blockquote Section */}
        {article.blockquote && (
          <blockquote className="p-4 mt-4 rounded blockquote bg-light" style={{ fontStyle: "italic" }}>
            <p>&quot;{article.blockquote}&quot;</p>
          </blockquote>
        )}

        {/* Advertisement Section */}
        <div className="my-5 text-center">
          <img
            src={article.advertisementImage}
            alt="Advertisement"
            className="img-fluid"
            style={{ maxWidth: "750px" }}
          />
        </div>
      </div>
    </div>
    </MainLayout>
  );
}




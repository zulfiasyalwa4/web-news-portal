import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import profile from "../../assets/profile.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../ui/Card";

export default function SecBlog() {
  const [articles, setArticles] = useState([]); // State untuk menyimpan semua artikel
  const navigate = useNavigate(); // Gunakan untuk navigasi

  // Ambil semua artikel dari API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/articles"); // Panggil endpoint semua artikel
        const allArticles = response.data;
        setArticles(allArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  if (articles.length === 0) {
    return <p>Loading...</p>; // Tampilkan loading jika data belum ada
  }

  console.log(articles[0]);

  return (
    <div id="blog" className="container">
      <h3 className="pt-5 mb-4">Latest Posts</h3>
      <div className="row">
        {articles
          .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate)) // Urutkan artikel berdasarkan tanggal terbaru
          .map((article) => (
            <div className="mb-4 col-lg-4 col-md-6" key={article.articleId}>
              <Card
                image={article.mainImage}
                title={article.title}
                category={article.category}
                authorName={article.authorName}
                authorImage={article.profileImage || profile}
                date={article.publishDate}
                onClick={() => navigate(`/articlesec/${article.articleId}`)} // Navigasi dengan `useNavigate`
              />
            </div>
          ))}
      </div>
    </div>
  );
}

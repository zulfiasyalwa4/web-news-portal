import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import CategoryFilter from "../components/ui/CategoryFilter";
import SearchBar from "../components/ui/SearchBar";
import MainLayout from "../layout/MainLayout";

export default function AllArticles() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Get search term from query params
    const query = searchParams.get("query");
    if (query) setSearchTerm(query);
  }, [searchParams]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const params = new URLSearchParams();
        if (searchTerm) params.append("title", searchTerm);
        if (selectedCategory) params.append("category", selectedCategory);

        const response = await axios.get(
          `http://localhost:5000/api/articles?${params.toString()}`
        );
        const allArticles = response.data;

        setArticles(allArticles);

        const uniqueCategories = [
          ...new Set(allArticles.map((article) => article.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [searchTerm, selectedCategory]);

  const filteredArticles = articles
    .filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (article) =>
        !selectedCategory || article.category === selectedCategory
    );

  return (
    <MainLayout>
      <div id="blog" className="container">
        <h3 className="pt-5 mb-4">Latest Posts</h3>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="row">
          {filteredArticles
            .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
            .map((article) => (
              <div className="mb-4 col-lg-4 col-md-6" key={article.articleId}>
                <Card
                  image={article.mainImage}
                  title={article.title}
                  category={article.category}
                  authorName={article.authorName}
                  authorImage={article.profileImage || "default-profile.jpg"}
                  date={article.publishDate}
                  onClick={() => navigate(`/articlesec/${article.articleId}`)}
                />
              </div>
            ))}
        </div>
        {filteredArticles.length === 0 && <p>No articles found.</p>}
      </div>
    </MainLayout>
  );
}

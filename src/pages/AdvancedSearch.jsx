import React, { useState } from "react";
import axios from "axios";

export default function AdvancedSearch() {
    const [authorName, setAuthorName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [articles, setArticles] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/articles/search", {
                params: { authorName, startDate, endDate },
            });
            setArticles(response.data);
        } catch (error) {
            console.error("Error performing search:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h3>Advanced Article Search</h3>
            <div className="row">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Author Name"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="date"
                        className="form-control"
                        placeholder="Start Date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="date"
                        className="form-control"
                        placeholder="End Date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <button className="btn btn-primary" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>

            {/* Search Results */}
            <div className="mt-4">
                <h4>Search Results</h4>
                {articles.length === 0 ? (
                    <p>No articles found.</p>
                ) : (
                    <div className="row">
                        {articles.map((article) => (
                            <div className="col-md-4" key={article.articleId}>
                                <div className="mb-3 card">
                                    <img
                                        src={article.mainImage}
                                        className="card-img-top"
                                        alt={article.title}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{article.title}</h5>
                                        <p className="card-text">{article.category}</p>
                                        <p className="card-text text-muted">{article.authorName}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

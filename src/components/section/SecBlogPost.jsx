import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import profile from "../../assets/profile.svg";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import CardPost from "../ui/CardPost";
export default function SecSinglePost() {
  const { authorId } = useParams(); // Pindahkan `useParams` ke dalam komponen

  const [user, setUser] = useState(null); // Inisialisasi state dengan null

  useEffect(() => {
    const fetchAuthorProfile = async () => {
      try {
        const cleanedAuthorId = encodeURIComponent(authorId.trim());
        const response = await axios.get(`http://localhost:5000/api/single-post/${cleanedAuthorId}`);
        const authorData = response.data;
        setUser(authorData);
      } catch (error) {
        console.error("Error fetching author profile:", error);
      }
    };

    fetchAuthorProfile();
  }, [authorId]); // Tambahkan dependency `authorId` untuk memastikan fetch dilakukan jika `authorId` berubah

  if (!user) {
    return <p>Loading...</p>; // Tampilkan loading jika data belum ada
  }

  return (
    <div id="blog" className="container">
      <h3 className="pt-5 mb-4">Latest Post</h3>
      <div className="container pt-5 mt-5 mb-4">
        <div className="mb-4 row"> 
          {user.articles
            .slice(0, 3)
            .map((article) => ( // Tampilkan hanya 3 artikel terbaru
              <div className="mb-4 col-lg-4 col-md-6" key={article.articleId}> 
                <CardPost
                  image={article.mainImage}
                  title={article.title}
                  category={article.category}
                  authorName={user.name}
                  authorImage={user.profileImage}
                  date={article.publishDate}
                  onClick={() => (window.location.href = `/articlesec/${article.articleId}`)}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}


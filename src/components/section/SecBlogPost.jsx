/**
 * Komponen untuk menampilkan postingan terbaru dari seorang penulis
 *
 * @param {object} user - Data penulis yang diambil dari API
 * @return {JSX.Element}
 */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import profile from "../../assets/profile.svg";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import CardPost from "../ui/CardPost";
import { auth } from "../../firebase/setup";
import { onAuthStateChanged } from "firebase/auth";

export default function SecSinglePost() {
  const [currentUser, setCurrentUser] = useState(null);
  const { authorId } = useParams(); // Ambil parameter `authorId` dari URL
  const navigate = useNavigate(); // Gunakan untuk navigasi
  const [user, setUser] = useState(null); // Inisialisasi state dengan null

  // Ambil profil penulis dari API
  useEffect(() => {
    const fetchAuthorProfile = async () => {
      try {
        const cleanedAuthorId = encodeURIComponent(authorId.trim());
        const response = await axios.get(
          `http://localhost:5000/api/single-post/${cleanedAuthorId}`
        );
        const authorData = response.data;
        setUser(authorData);
      } catch (error) {
        console.error("Error fetching author profile:", error);
      }
    };

    fetchAuthorProfile();
  }, [authorId]);

  // Pantau perubahan pada status autentikasi
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  // Fungsi untuk menghapus artikel
  const handleDelete = async (articleId) => {
    if (!auth.currentUser) {
      console.error("User not authenticated");
      return; // Early return jika pengguna tidak terautentikasi
    }

    try {
      const token = await auth.currentUser.getIdToken();
      const cleanedArticleId = encodeURIComponent(articleId.trim());

      await axios.delete(
        `http://localhost:5000/api/articles/${cleanedArticleId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Perbarui state setelah artikel dihapus
      setUser((prevState) => ({
        ...prevState,
        articles: prevState.articles.filter((article) => article.articleId !== articleId),
      }));
    } catch (error) {
      console.error("Error deleting article:", error);
      // Tambahkan feedback pengguna jika terjadi kesalahan
    }
  };

  if (!user) {
    return <p>Loading...</p>; // Tampilkan loading jika data belum ada
  }

  return (
    <div id="blog" className="container">
      <h3 className="pt-5 mb-4">Latest Post from {user.name}</h3>
      <div className="">
        <div className="mb-4 row">
          {user.articles
            .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate)) // Urutkan artikel berdasarkan tanggal terbaru
            .slice(0, 6) // Tampilkan hanya 3 artikel terbaru
            .map((article) => (
              <div className="mb-4 col-lg-4 col-md-6" key={article.articleId}>
                <CardPost
                  image={article.mainImage}
                  title={article.title}
                  category={article.category}
                  authorName={user.name}
                  authorImage={user.profileImage || profile}
                  date={article.publishDate}
                  onClick={() => navigate(`/articlesec/${article.articleId}`)} // Navigasi dengan `useNavigate`
                  onDelete={() => handleDelete(article.articleId)}
                  onEdit={() => navigate(`/edit/${article.articleId}`)}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

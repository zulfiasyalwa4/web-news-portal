import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import profile from "../../assets/profile.svg";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

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
  }, [authorId]);

  if (!user) {
    return <p>Loading...</p>; // Tampilkan loading jika data belum ada
  }

  return (
    <div className="container p-4 mt-5">
      <div
        className="p-5 rounded d-flex flex-column align-items-center bg-light"
        style={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          margin: "auto",
          borderRadius: "12px",
        }}
      >
        {/* Profile Image */}
        <img
          src={user.profileImage || profile} // Gunakan `user.profileImage` jika ada, fallback ke `profile`
          alt={user.name}
          className="mb-3 rounded-circle"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />

        {/* Name and Title */}
        <h4 className="fw-bold">{user.name}</h4>
        <p className="text-muted">{user.title || "Author"}</p> {/* Fallback ke "Author" jika `title` kosong */}

        {/* Description */}
        <p className="px-4 text-center text-muted">{user.description || "No description available."}</p>

        {/* Social Media Icons */}
        {user.socialMedia && (
          <div className="mt-3 d-flex justify-content-center">
            {user.socialMedia.facebook && (
              <a href={user.socialMedia.facebook} className="mx-2 text-dark">
                <i className="bi bi-facebook" style={{ fontSize: "20px" }}></i>
              </a>
            )}
            {user.socialMedia.twitter && (
              <a href={user.socialMedia.twitter} className="mx-2 text-dark">
                <i className="bi bi-twitter" style={{ fontSize: "20px" }}></i>
              </a>
            )}
            {user.socialMedia.instagram && (
              <a href={user.socialMedia.instagram} className="mx-2 text-dark">
                <i className="bi bi-instagram" style={{ fontSize: "20px" }}></i>
              </a>
            )}
            {user.socialMedia.youtube && (
              <a href={user.socialMedia.youtube} className="mx-2 text-dark">
                <i className="bi bi-youtube" style={{ fontSize: "20px" }}></i>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
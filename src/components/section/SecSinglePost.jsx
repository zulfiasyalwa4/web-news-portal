import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import profile from "../../assets/profile.svg";
import { redirect, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function SecSinglePost() {
  const { authorId } = useParams(); // Mengambil parameter URL
  const [user, setUser] = useState(null); // Data user yang ditampilkan
  const [isEditing, setIsEditing] = useState(false); // Mode edit aktif/tidak
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    userProfile: "",
  });

  // Fetch data user saat komponen pertama kali dirender
  useEffect(() => {
    const fetchAuthorProfile = async () => {
      if (!authorId) {
        console.error("Author ID is invalid or empty");
        return;
      }

      try {
        const cleanedAuthorId = encodeURIComponent(authorId.trim());
        const response = await axios.get(
          `http://localhost:5000/api/single-post/${cleanedAuthorId}`
        );
        const authorData = response.data;

        setUser(authorData); // Set state user
        setFormData({
          name: authorData.name || "",
          title: authorData.title || "",
          userProfile: authorData.userProfile || "",
          profileImage: authorData.profileImage || "",
        });
      } catch (error) {
        console.error("Error fetching author profile:", error);
      }
    };

    fetchAuthorProfile();
  }, [authorId]);

  // Handle perubahan input di form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle mode edit
  const handleEditToggle = () => {
    setIsEditing((prev) => {
      // Reset form jika keluar dari mode edit
      if (prev) {
        setFormData({
          name: user.name || "",
          title: user.title || "",
          userProfile: user.userProfile || "",
        });
      }
      return !prev;
    });
  };

  // Simpan perubahan ke backend
  const handleSave = async () => {
    if (!authorId) {
      console.error("Author ID is invalid or empty");
      return;
    }

    try {
      const cleanedAuthorId = encodeURIComponent(authorId.trim());
      const response = await axios.put(
        `http://localhost:5000/api/single-post/${cleanedAuthorId}`,
        formData
      );
      setUser(response.data); // Update data user dengan hasil dari backend
      setIsEditing(false); // Keluar dari mode edit
    } catch (error) {
      console.error("Error updating author profile:", error);
    }
    window.location.reload();
  };

  // Jika data user belum dimuat
  if (!user) {
    return (
      <div className="container p-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
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
        {/* Tombol Edit */}
        <div className="align-self-end">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={handleEditToggle}
            title={isEditing ? "Cancel" : "Edit Profile"}
          >
            <i className={`bi ${isEditing ? "bi-x" : "bi-pencil"}`}></i>
          </button>
        </div>

        {/* Gambar Profil */}
        <img
          src={user?.profileImage || profile}
          alt={user?.name || "Profile"}
          className="mb-3 rounded-circle"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />

        {/* Nama dan Judul */}
        {isEditing ? (
          <>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mb-2 form-control"
              placeholder="Name"
            />
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mb-2 form-control"
              placeholder="Title"
            />
            <input
              type="text"
              name="title"
              value={formData.profileImage}
              onChange={handleChange}
              className="mb-2 form-control"
              placeholder="Title"
            />
          </>
        ) : (
          <>
            <h4 className="fw-bold">{user?.name || "Anonymous"}</h4>
            <p className="text-muted">{user?.title || "Author"}</p>
          </>
        )}

        {/* Deskripsi */}
        {isEditing ? (
          <textarea
            name="userProfile"
            value={formData.userProfile}
            onChange={handleChange}
            className="mb-2 form-control"
            placeholder="Description"
            rows="3"
          ></textarea>
        ) : (
          <p className="px-4 text-center text-muted">
            {user?.userProfile || "No description available."}
          </p>
        )}

        {/* Tombol Simpan */}
        {isEditing && (
          <button className="mt-3 btn btn-primary" onClick={handleSave}>
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
}

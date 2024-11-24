import "bootstrap/dist/css/bootstrap.min.css";
import illustration from "../../assets/illustration.svg";
import profile from "../../assets/profile.svg";

export default function SecHero() {
  return (
    <div className="container mt-5 position-relative">
      {/* Gambar Hero */}
      <img
        src={illustration}
        alt="Hero"
        className="mt-3 img-fluid w-100"
        style={{ filter: "brightness(70%)", borderRadius: "20px" }}
      />
      {/* Konten di atas gambar dengan box */}
      <div
        className="p-4 bg-white position-absolute text-dark"
        style={{
          bottom: "-40px", // Menggeser box keluar dari gambar
          left: "50px",
          maxWidth: "450px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <span className="mb-3 badge bg-primary">Technology</span>
        <h2 className="fw-bold">
          The Impact of Technology on the Workplace: How Technology is Changing
        </h2>
        <div className="mt-3 d-flex align-items-center">
          <img src={profile} alt="Author" className="rounded-circle me-2" />
          <div className="d-flex flex-column">
            <span className="fw-bold">Jason Francisco</span>
            <span className="text-muted">August 20, 2022</span>
          </div>
        </div>
      </div>
    </div>
  );
}

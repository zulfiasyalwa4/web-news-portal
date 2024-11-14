import "bootstrap/dist/css/bootstrap.min.css";
import illustration from "../../assets/illustration.svg";
import profile from "../../assets/profile.svg";

export default function SecHero() {
  return (
    <div className="container position-relative mt-5">
      {/* Gambar Hero */}
      <img
        src={illustration}
        alt="Hero"
        className="img-fluid w-100 mt-3"
        style={{ filter: "brightness(70%)", borderRadius: "20px" }}
      />
      {/* Konten di atas gambar dengan box */}
      <div
        className="position-absolute bg-white text-dark p-4"
        style={{
          bottom: "-40px", // Menggeser box keluar dari gambar
          left: "50px",
          maxWidth: "450px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <span className="badge bg-primary mb-3">Technology</span>
        <h2 className="fw-bold">
          The Impact of Technology on the Workplace: How Technology is Changing
        </h2>
        <div className="d-flex align-items-center mt-3">
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

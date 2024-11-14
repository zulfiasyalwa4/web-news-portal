import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import profile from "../../assets/profile.svg";

export default function SecSinglePost() {
  return (
    <div className="container mt-5 p-4">
      <div
        className="d-flex flex-column align-items-center bg-light p-5 rounded"
        style={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          margin: "auto",
          borderRadius: "12px",
        }}
      >
        {/* Profile Image */}
        <img
          src={profile}
          alt="Jonathan Doe"
          className="rounded-circle mb-3"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />

        {/* Name and Title */}
        <h4 className="fw-bold">Jonathan Doe</h4>
        <p className="text-muted">Collaborator & Editor</p>

        {/* Description */}
        <p className="text-center text-muted px-4">
          Meet Jonathan Doe, a passionate writer and blogger with a love for
          technology and travel. Jonathan holds a degree in Computer Science and
          has spent years working in the tech industry, gaining a deep
          understanding of the impact technology has on our lives.
        </p>

        {/* Social Media Icons */}
        <div className="d-flex justify-content-center mt-3">
          <a href="#" className="mx-2 text-dark">
            <i className="bi bi-facebook" style={{ fontSize: "20px" }}></i>
          </a>
          <a href="#" className="mx-2 text-dark">
            <i className="bi bi-twitter" style={{ fontSize: "20px" }}></i>
          </a>
          <a href="#" className="mx-2 text-dark">
            <i className="bi bi-instagram" style={{ fontSize: "20px" }}></i>
          </a>
          <a href="#" className="mx-2 text-dark">
            <i className="bi bi-youtube" style={{ fontSize: "20px" }}></i>
          </a>
        </div>
      </div>
    </div>
  );
}

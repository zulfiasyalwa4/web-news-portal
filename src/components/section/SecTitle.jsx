import "bootstrap/dist/css/bootstrap.min.css";
import illustration from "../../assets/illustration.svg";
import profile from "../../assets/profile.svg";

export default function SecTitle() {
  return (
    <div className="container pt-4">
      {/* Page Title */}
      <div className="text-center my-5">
        <h1 className="fw-bold">Page Title</h1>
        <nav className="d-flex justify-content-center mt-3">
          <a href="#" className="text-dark me-3 text-decoration-none">
            Home
          </a>
          <span>|</span>
          <a href="#" className="text-dark ms-3 text-decoration-none">
            Link One
          </a>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="position-relative">
        <img
          src={illustration}
          alt="Hero"
          className="img-fluid w-100"
          style={{ borderRadius: "12px", objectFit: "cover", height: "400px" }}
        />
        {/* Overlay Text */}
        <div
          className="position-absolute text-white p-4"
          style={{
            bottom: "20px",
            left: "20px",

            borderRadius: "12px",
            width: "fit-content",
          }}
        >
          <span className="badge bg-primary mb-2">Technology</span>
          <h2 className="fw-bold w-50">
            The Impact of Technology on the Workplace: How Technology is
            Changing
          </h2>
          <div className="d-flex align-items-center mt-3">
            <img
              src={profile}
              alt="Author"
              className="rounded-circle me-2"
              style={{ width: "40px", height: "40px" }}
            />
            <div>
              <span className="fw-bold">Tracey Wilson</span>
              <br />
              <small className="text-white-50">August 20, 2022</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

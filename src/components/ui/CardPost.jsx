import "bootstrap/dist/css/bootstrap.min.css";

// eslint-disable-next-line react/prop-types
export default function CardPost({ image, account, onClick }) {
  return (
    <div
      className="card shadow-sm card-hover"
      style={{ borderRadius: "12px", cursor: "pointer" }}
      onClick={onClick} // Handler untuk klik
    >
      <img
        src={image}
        alt="Post"
        className="card-img-top"
        style={{
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          height: "200px",
          objectFit: "cover",
        }}
      />
      <div className="card-body">
        <span className="badge bg-light text-primary mb-2">Technology</span>
        <h5 className="card-title">
          The Impact of Technology on the Workplace: How Technology is Changing
        </h5>
        <div className="d-flex align-items-center mt-3">
          <img
            src={account}
            alt="Author"
            className="rounded-circle me-2"
            style={{ width: "40px", height: "40px" }}
          />
          <div>
            <span className="fw-bold">Tracey Wilson</span>
            <br />
            <small className="text-muted">August 20, 2022</small>
          </div>
        </div>
      </div>
    </div>
  );
}

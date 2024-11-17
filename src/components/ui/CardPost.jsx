import "bootstrap/dist/css/bootstrap.min.css";

// eslint-disable-next-line react/prop-types
export default function CardPost({ image, category, title, authorName, authorImage, date, onClick }) {
  return (
    <div
      className="shadow-sm card card-hover"
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
        <span className="mb-2 badge bg-light text-primary">{category}</span>
        <h5 className="card-title">{title}</h5>
        <div className="mt-3 d-flex align-items-center">
          <img
            src={authorImage}
            alt="Author"
            className="rounded-circle me-2"
            style={{ width: "40px", height: "40px" }}
          />
          <div>
            <span className="fw-bold">{authorName}</span>
            <br />
            <small className="text-muted">{new Date(date).toLocaleDateString()}</small>
          </div>
        </div>
      </div>
    </div>
  );
}

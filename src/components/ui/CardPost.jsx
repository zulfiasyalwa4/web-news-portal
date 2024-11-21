import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// eslint-disable-next-line react/prop-types
export default function CardPost({ image, category, title, authorName, authorImage, date, onClick, onDelete, onEdit }) {
  return (
    <div
      className="shadow-sm card card-hover position-relative"
      style={{ borderRadius: "12px", cursor: "pointer" }}
      onClick={onClick}
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
      {/* Action buttons */}
      <div className="bottom-0 position-absolute end-0 d-flex">
        <button
          className="m-2 btn btn-danger"
          style={{ borderRadius: "50%" }}
          onClick={(e) => {
            e.stopPropagation(); // Prevent click from propagating
            onDelete(); // Call onDelete function
          }}
        >
          <i className="bi bi-trash"></i>
        </button>
        <button
          className="m-2 btn btn-primary"
          style={{ borderRadius: "50%" }}
          onClick={(e) => {
            e.stopPropagation(); // Prevent click from propagating
            onEdit(); // Call onEdit function
          }}
        >
          <i className="bi bi-pencil"></i>
        </button>
      </div>
    </div>
  );
}


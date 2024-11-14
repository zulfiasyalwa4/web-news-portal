import Logo from "../../assets/logo.png";

export default function Navbar() {
  return (
    <div className="container fixed-top bg-white">
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={Logo} alt="MetaBlog Logo" style={{ height: "40px" }} />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link " aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#blog">
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/single-post">
                  Single Post
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/pages">
                  Pages
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Contact
                </a>
              </li>
            </ul>
            <form className="d-flex position-relative" role="search">
              <input
                className="form-control rounded-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{
                  paddingRight: "45px",
                  backgroundColor: "#f4f4f4",
                  color: "#999",
                  outline: "none",
                  boxShadow: "none",
                }}
              />
              <button
                type="button"
                className="btn position-absolute"
                style={{
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M18.319 14.433A8.001 8.001 0 0 0 6.343 3.868a8 8 0 0 0 10.564 11.976l.043.045l4.242 4.243a1 1 0 1 0 1.415-1.415l-4.243-4.242zm-2.076-9.15a6 6 0 1 1-8.485 8.485a6 6 0 0 1 8.485-8.485"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

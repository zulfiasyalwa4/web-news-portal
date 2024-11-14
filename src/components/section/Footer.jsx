import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-light pt-5">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-3">
            <h5>About</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
            <p>
              <strong>Email:</strong> csblog@example.com
            </p>
            <p>
              <strong>Phone:</strong> 880 123 456 789
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="col-md-2">
            <h5>Quick Link</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-dark text-decoration-none">
                  Home
                </a>
              </li>
              <li className="mt-2">
                <a href="#" className="text-dark text-decoration-none">
                  About
                </a>
              </li>
              <li className="mt-2">
                <a href="#" className="text-dark text-decoration-none">
                  Blog
                </a>
              </li>
              <li className="mt-2">
                <a href="#" className="text-dark text-decoration-none">
                  Archived
                </a>
              </li>
              <li className="mt-2">
                <a href="#" className="text-dark text-decoration-none">
                  Author
                </a>
              </li>
              <li className="mt-2">
                <a href="#" className="text-dark text-decoration-none">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Category Section */}
          <div className="col-md-2">
            <h5>Category</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-dark text-decoration-none">
                  Lifestyle
                </a>
              </li>
              <li className="mt-2">
                <a href="#" className="text-dark text-decoration-none">
                  Technology
                </a>
              </li>
              <li className="mt-2">
                <a href="#" className="text-dark text-decoration-none">
                  Travel
                </a>
              </li>
              <li className="mt-2">
                <a href="#" className="text-dark text-decoration-none">
                  Business
                </a>
              </li>
              <li className="mt-2">
                <a href="#" className="text-dark text-decoration-none">
                  Economy
                </a>
              </li>
              <li className="mt-2">
                <a href="#" className="text-dark text-decoration-none">
                  Sports
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="col-md-5">
            <h5>Weekly Newsletter</h5>
            <p>Get blog articles and offers via email</p>
            <form className="d-flex">
              <input
                type="email"
                className="form-control me-2"
                placeholder="Your Email"
                aria-label="Email"
                style={{ borderRadius: "20px", padding: "10px" }}
              />
              <button
                className="btn btn-primary"
                type="submit"
                style={{ borderRadius: "20px" }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="row py-4 d-flex align-items-center">
          <div className="col-md-6 d-flex align-items-center">
            <img src={logo} alt="MetaBlog Logo" style={{ height: "30px" }} />
          </div>
          <div className="col-md-6 text-md-end d-flex align-items-center justify-content-md-end">
            <a href="#" className="me-3 text-dark text-decoration-none">
              Terms of Use
            </a>
            <a href="#" className="me-3 text-dark text-decoration-none">
              Privacy Policy
            </a>
            <a href="#" className="text-dark text-decoration-none">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

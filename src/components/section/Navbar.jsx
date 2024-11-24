import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { auth } from "../../firebase/setup";
import { signOut, onAuthStateChanged } from "firebase/auth";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setCurrentUser(user);
    });
    return unsubscribe; // Cleanup subscription
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the default form submission
    if (searchQuery.trim()) {
      navigate(`/all-articles?query=${encodeURIComponent(searchQuery.trim())}`); // Navigate to the search results page
    }
  };

  return (
    <div className="container bg-white fixed-top">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
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
            <ul className="mx-auto mb-2 navbar-nav mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/all-articles">
                  All Articles
                </a>
              </li>
              {isAuthenticated && (
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/post">
                    Post Article
                  </a>
                </li>
              )}
              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  Contact
                </a>
              </li>
            </ul>
            <form
              className="d-flex position-relative"
              role="search"
              onSubmit={handleSearch} // Trigger search on submit
            >
              <input
                className="form-control rounded-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update state on input
                style={{
                  paddingRight: "45px",
                  backgroundColor: "#f4f4f4",
                  color: "#999",
                  outline: "none",
                  boxShadow: "none",
                }}
              />
              <button
                type="submit" // Submit the form
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
            {isAuthenticated ? (
              <div className="gap-2 d-flex align-items-center nav-item ms-3">
                <a
                  className="nav-link d-flex align-items-center"
                  href={`/single-post/${currentUser ? currentUser.uid : ""}`}
                >
                  <img
                    src={currentUser ? currentUser.photoURL : Logo}
                    alt="Profile"
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </a>
                <button className="nav-link btn btn-link" onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            ) : (
              <div className="nav-item ms-3">
                <a className="nav-link" href="/signin">
                  Sign In
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

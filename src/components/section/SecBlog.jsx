import "bootstrap/dist/css/bootstrap.min.css";
import CardPost from "../ui/CardPost";
import image1 from "../../assets/image1.svg";
import account1 from "../../assets/account1.svg";
import image2 from "../../assets/image2.svg";
import account2 from "../../assets/account2.svg";
import image3 from "../../assets/image3.svg";
import account3 from "../../assets/account3.svg";
import image4 from "../../assets/image4.svg";
import account4 from "../../assets/account4.svg";
import image5 from "../../assets/image5.svg";
import account5 from "../../assets/account5.svg";
import image6 from "../../assets/image6.svg";
import account6 from "../../assets/account6.svg";
import image7 from "../../assets/image7.svg";
import account7 from "../../assets/account7.svg";
import image8 from "../../assets/image8.svg";
import account8 from "../../assets/account8.svg";
import image9 from "../../assets/image9.svg";
import account9 from "../../assets/account9.svg";

export default function SecBlog() {
  return (
    <div id="blog" className="container" style={{ paddingTop: "15px" }}>
      <h3 className="mb-4 mt-5 pt-5">Latest Post</h3>
      <div className="row mb-4">
        <div className="col-lg-4 col-md-6 mb-4">
          <CardPost
            image={image1}
            account={account1}
            onClick={() => (window.location.href = "/article")}
          />
        </div>
        <div className="col-lg-4 col-md-6 mb-4">
          <CardPost
            image={image2}
            account={account2}
            onClick={() => (window.location.href = "/article")}
          />
        </div>
        <div className="col-lg-4 col-md-6 mb-4">
          <CardPost
            image={image3}
            account={account3}
            onClick={() => (window.location.href = "/article")}
          />
        </div>
        <div className="col-lg-4 col-md-6 mb-4">
          <CardPost
            image={image4}
            account={account4}
            onClick={() => (window.location.href = "/article")}
          />
        </div>
        <div className="col-lg-4 col-md-6 mb-4">
          <CardPost
            image={image5}
            account={account5}
            onClick={() => (window.location.href = "/article")}
          />
        </div>
        <div className="col-lg-4 col-md-6 mb-4">
          <CardPost
            image={image6}
            account={account6}
            onClick={() => (window.location.href = "/article")}
          />
        </div>
        <div className="col-lg-4 col-md-6 mb-4">
          <CardPost
            image={image7}
            account={account7}
            onClick={() => (window.location.href = "/article")}
          />
        </div>
        <div className="col-lg-4 col-md-6 mb-4">
          <CardPost
            image={image8}
            account={account8}
            onClick={() => (window.location.href = "/article")}
          />
        </div>
        <div className="col-lg-4 col-md-6 mb-4">
          <CardPost
            image={image9}
            account={account9}
            onClick={() => (window.location.href = "/article")}
          />
        </div>
      </div>
    </div>
  );
}

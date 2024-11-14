import "bootstrap/dist/css/bootstrap.min.css";
import articleimage from "../../assets/article-image.svg"; // Ganti dengan path gambar Anda
import profile from "../../assets/profile.svg"; // Ganti dengan path gambar penulis
import articleimage2 from "../../assets/article-image2.svg"; // Gambar placeholder iklan

export default function SecArticle() {
  return (
    <div
      className="container mt-5 mb-5 pt-4"
      style={{ paddingLeft: "180px", paddingRight: "180px" }}
    >
      {/* Article Header */}
      <div className="mb-4">
        <span className="badge bg-primary">Technology</span>
        <h1 className="mt-3 fw-bold">
          The Impact of Technology on the Workplace: How Technology is Changing
        </h1>
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
            <small className="text-muted">August 20, 2022</small>
          </div>
        </div>
      </div>

      {/* Article Image */}
      <div className="mb-4">
        <img
          src={articleimage}
          alt="Article"
          className="img-fluid w-100"
          style={{ borderRadius: "12px", objectFit: "cover" }}
        />
      </div>

      {/* Article Content */}
      <div className="article-content">
        <h3 className="fw-bold fs-4">Research Your Destination</h3>
        <p>
          Before embarking on your journey, take the time to research your
          destination. This includes understanding the local culture, customs,
          and laws, as well as identifying top attractions, restaurants, and
          accommodations. Doing so will help you navigate your destination with
          confidence and avoid any cultural faux pas.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. In
          hendrerit gravida rutrum quisque non tellus orci ac auctor. Mi ipsum
          faucibus vitae aliquet nec ullamcorper sit amet. Aenean euismod
          elementum nisi quis eleifend quam adipiscing vitae. Viverra adipiscing
          at in tellus.
        </p>

        <h3 className="fw-bold fs-4">Plan Your Itinerary</h3>
        <p>
          While it&apos;s essential to leave room for spontaneity and unexpected
          adventures, having a rough itinerary can help you make the most of
          your time and budget. Identify the must-see sights and experiences and
          prioritize them according to your interests and preferences. This will
          help you avoid overscheduling and ensure that you have time to relax
          and enjoy your journey.
        </p>
        <p>
          Vitae sapien pellentesque habitant morbi tristique. Luctus venenatis
          lectus magna fringilla. Nec ullamcorper sit amet risus nullam eget
          felis. Tincidunt arcu non sodales neque sodales ut etiam sit amet.
        </p>

        {/* Blockquote Section */}
        <blockquote
          className="blockquote p-4 mt-4 bg-light rounded"
          style={{ fontStyle: "italic" }}
        >
          <p>
            &quot;Traveling can expose you to new environments and potential
            health risks, so it&apos;s crucial to take precautions to stay safe
            and healthy.&quot;
          </p>
        </blockquote>

        {/* Advertisement Section */}
        <div className="text-center my-5">
          <img
            src={articleimage2}
            alt="Advertisement"
            className="img-fluid"
            style={{ maxWidth: "750px" }}
          />
        </div>

        {/* Additional Sections */}
        <h3 className="fw-bold fs-4">Pack Lightly and Smartly</h3>
        <p>
          Packing can be a daunting task, but with some careful planning and
          smart choices, you can pack light and efficiently. Start by making a
          packing list and sticking to it, focusing on versatile and comfortable
          clothing that can be mixed and matched. Invest in quality luggage and
          packing organizers to maximize space and minimize wrinkles.
        </p>

        <h3 className="fw-bold fs-4">Stay Safe and Healthy</h3>
        <p>
          Traveling can expose you to new environments and potential health
          risks, so it&apos;s crucial to take precautions to stay safe and
          healthy. This includes researching any required vaccinations or
          medications, staying hydrated, washing your hands frequently, and
          using sunscreen and insect repellent. It&apos;s also essential to keep
          your valuables safe and secure and to be aware of your surroundings at
          all times.
        </p>

        <h3 className="fw-bold fs-4">Immerse Yourself in the Local Culture</h3>
        <p>
          One of the most rewarding aspects of traveling is immersing yourself
          in the local culture and customs. This includes trying local cuisine,
          attending cultural events and festivals, and interacting with locals.
          Learning a few phrases in the local language can also go a long way in
          making connections and showing respect.
        </p>

        <h3 className="fw-bold fs-4">Capture Memories</h3>
        <p>
          Finally, don&apos;t forget to capture memories of your journey.
          Whether it&apos;s through photographs, journaling, or souvenirs,
          preserving the moments and experiences of your travels can bring joy
          and nostalgia for years to come. However, it&apos;s also essential to
          be present in the moment and not let technology distract you from the
          beauty of your surroundings.
        </p>

        <h3 className="fw-bold fs-4">Conclusion</h3>
        <p>
          Traveling is an art form that requires a blend of planning,
          preparation, and spontaneity. By following these tips and tricks, you
          can make the most of your journey and create memories that last a
          lifetime. So pack your bags, embrace the adventure, and enjoy the
          ride.
        </p>
      </div>
    </div>
  );
}

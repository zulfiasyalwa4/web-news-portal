import Footer from "../components/section/Footer";
import Navbar from "../components/section/Navbar";

// eslint-disable-next-line react/prop-types
export default function MainLayout({ children }) {
  return (
    <div>
      {/* Navbar akan tetap ter-render di atas, menggunakan class Bootstrap */}
      <Navbar />

      {/* Bagian utama menggunakan Bootstrap container dan padding-top untuk memberikan ruang dari navbar */}
      <main className="container pt-4">{children}</main>

      {/* Footer di bagian bawah */}
      <Footer />
    </div>
  );
}

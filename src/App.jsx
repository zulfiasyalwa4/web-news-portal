import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pages from "./pages/Pages";
import Article from "./pages/Article";
import SinglePost from "./pages/SinglePost";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pages" element={<Pages />} />
        <Route path="/article" element={<Article />} />
        <Route path="/single-post" element={<SinglePost />} />
      </Routes>
    </BrowserRouter>
  );
}

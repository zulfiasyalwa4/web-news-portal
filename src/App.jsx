import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pages from "./pages/Pages";
import Articlesec from "./pages/Articlesec"
import SinglePost from "./pages/SinglePost";
import Signin from "./pages/Signin";
import PostArticle from "./pages/PostArticle";
import Article from "./pages/Article";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pages" element={<Pages />} />
        <Route path="/article" element={<Article />} />
        <Route path="/single-post" element={<SinglePost />}
        />
        <Route path="/articlesec/:articleId" element={<Articlesec />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="*" element={<Home />} />
        <Route path="/post" element={<PostArticle />} />
      </Routes>
    </BrowserRouter>
  );
}

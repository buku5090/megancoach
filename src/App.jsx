import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import AdminNewPost from "./pages/AdminNewPost";
import Home from "./pages/Home";
import Despre from "./pages/Despre";
import Programe from "./pages/Programe";
import ResurseGratuite from "./pages/ResurseGratuite";
import Evenimente from "./pages/Evenimente";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ProgrameazaSesiuni from "./pages/ProgrameazaSesiuni";
import Contact from "./pages/Contact";
import Feedback from "./pages/Feedback";
import StarterResurse from "./pages/StarterResurse";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/despre" element={<Despre/>} />
        <Route path="/programe" element={<Programe/>} />
        <Route path="/resurse-gratuite" element={<ResurseGratuite/>} />
        <Route path="/evenimente" element={<Evenimente/>} />
        <Route path="/blog" element={<Blog/>} />
        <Route path="/blog/:slug" element={<BlogPost/>} />
        <Route path="/programeaza-sesiuni" element={<ProgrameazaSesiuni/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/feedback" element={<Feedback/>} />
        <Route path="/starter-resurse" element={<StarterResurse/>} />
        <Route path="/faq" element={<FAQ/>} />
        <Route path="*" element={<NotFound/>} />
        <Route path="/admin/new-post" element={<AdminNewPost />} />
      </Routes>
      <Footer />
      <ChatWidget />
    </BrowserRouter>
  );
}

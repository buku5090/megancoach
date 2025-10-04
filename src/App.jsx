import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";

import Home from "./pages/Home";
import Despre from "./pages/Despre";
import Programe from "./pages/Programe";
import BlogList from "./pages/BlogList"
import BlogPost from "./pages/BlogPost";
import ProgrameazaSesiuni from "./pages/ProgrameazaSesiuni";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

// Admin pages
import LoginHidden from "./pages/Login";                // /admin/login?key=...
import AdminNewPost from "./pages/AdminNewPost";        // creare post
import EditPost from "./pages/EditPost";                // edit/ștergere post
import NewsletterAdmin from "./pages/NewsletterAdmin";  // broadcast newsletter

import "./i18n";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/despre" element={<Despre />} />
        <Route path="/programe" element={<Programe />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/programeaza-sesiuni" element={<ProgrameazaSesiuni />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />

        {/* Admin (vizibile doar prin link / login) */}
        <Route path="/admin/login" element={<LoginHidden />} />
        <Route path="/admin/new-post" element={<AdminNewPost />} />
        <Route path="/admin/edit/:slug" element={<EditPost />} />
        <Route path="/admin/newsletter" element={<NewsletterAdmin />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ChatWidget />
    </BrowserRouter>
  );
}

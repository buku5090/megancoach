import Hero from "../components/Hero";
import Reasons from "../components/Reasons";
import Programe from "../pages/Programe";
import Testimonials from "../components/Testimonials";
import AboutTeaser from "../components/AboutTeaser";

export default function Home() {
  return (
    <main>
      <Hero />           {/* MiniCourse e deja în Hero */}
      <AboutTeaser />
      <Reasons />
      <Programe />
      <Testimonials />
    </main>
  );
}

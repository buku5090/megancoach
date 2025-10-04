// src/components/Hero.jsx
import { useRef } from "react";
import { useI18n } from "../i18n";
import MiniCourse from "./MiniCourse";

const VIDEO_SRC = "https://www.pexels.com/download/video/4420919/";
const POSTER_SRC = "https://images.pexels.com/photos/847402/pexels-photo-847402.jpeg";

export default function Hero() {
  const videoRef = useRef(null);
  const { t } = useI18n();

  const handleVideoError = () => {
    if (videoRef.current) videoRef.current.style.display = "none";
  };

  return (
    <>
      <section className="relative min-h-[72vh] md:min-h-[80vh]">
        <img src={POSTER_SRC} alt="" className="absolute inset-0 block h-full w-full object-cover md:hidden" loading="eager" aria-hidden="true" />
        <img src={POSTER_SRC} alt="" className="absolute inset-0 hidden h-full w-full object-cover md:block" loading="eager" aria-hidden="true" />
        <video ref={videoRef} className="absolute inset-0 hidden md:block h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster={POSTER_SRC} aria-hidden="true" onError={handleVideoError}>
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 pt-24 md:pt-28 pb-16 md:pb-20 text-center">
          <h1 className="font-serif text-white drop-shadow-sm text-[clamp(36px,6vw,80px)] leading-[1.05]">
            {/* opțiunea A: două linii din chei separate */}
            <span className="block">{t("hero_title_line1")}</span>
            <span className="block">{t("hero_title_line2")}</span>
            {/* opțiunea B (alternativă): o singură cheie + split vizual:
            <span className="block">{t("hero_title").split(". ")[0]}.</span>
            <span className="block">{t("hero_title").split(". ")[1]}</span>
            */}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-[clamp(16px,2.2vw,22px)] text-white/90">
            {t("hero_sub")}
          </p>
        </div>
      </section>

      <div className="relative z-20 mx-auto -mt-12 md:-mt-16 lg:-mt-20 mb-10 w-full max-w-5xl px-4">
        <MiniCourse />
      </div>
    </>
  );
}

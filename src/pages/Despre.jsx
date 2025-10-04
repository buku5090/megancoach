import HeroAbout from "../components/HeroAbout";
import { useI18n } from "../i18n";

// src/pages/Despre.jsx
export default function Despre() {
  const { t } = useI18n();

  return (
    <main className="bg-[#faf4ec] text-[#1a1a1a]">
      <HeroAbout />

      {/* ===== ABOUT… pe crem simplu ===== */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-3xl font-semibold mb-6">{t("about_h2")}</h2>
        <div className="space-y-6 text-lg text-[#2a2a2a]/85">
          <p>{t("about_par_1")}</p>
          <p>{t("about_par_2")}</p>
          <p>{t("about_par_3")}</p>
        </div>
      </section>

      {/* ===== MY JOURNEY… pe bej cu val negru jos ===== */}
      <section
        className="relative text-[#1a1a1a]"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1617957771961-1806e5b8b16a?q=80&w=2400&auto=format&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-[#e9dbcf]/90">
          <div className="mx-auto max-w-5xl px-4 py-16">
            <h3 className="text-3xl font-semibold mb-6">{t("journey_h3")}</h3>
            <div className="space-y-6 text-lg text-[#1a1a1a]/80">
              <p>{t("journey_par_1")}</p>
              <p>{t("journey_par_2")}</p>
              <p>{t("journey_par_3")}</p>
              <p>{t("journey_par_4")}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ==== Separator curbat (SVG) reutilizabil ==== */
function WaveBottom({ className = "text-black" }) {
  return (
    <svg
      viewBox="0 0 1440 140"
      preserveAspectRatio="none"
      className={`block w-full h-[80px] ${className}`}
    >
      <path
        d="M0,40 C300,140 1140,-40 1440,60 L1440,140 L0,140 Z"
        fill="currentColor"
      />
    </svg>
  );
}

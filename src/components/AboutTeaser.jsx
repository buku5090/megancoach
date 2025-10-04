// src/components/AboutTeaser.jsx
import Container from "./Container";
import { useI18n } from "../i18n";

export default function AboutTeaser() {
  const { t, lang } = useI18n();

  // dacă vei avea rute diferite pe EN, schimbă aici
  const aboutPath = lang === "ro" ? "/despre" : "/despre";
  // ex: const aboutPath = lang === "ro" ? "/despre" : "/about";

  return (
    <section>
      <Container className="py-16 grid md:grid-cols-2 gap-10 items-center">
        {/* Imaginea */}
        <div className="aspect-[4/5] rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop"
            alt={t("about_teaser_img_alt")}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Textul */}
        <div>
          <h3 className="text-2xl font-semibold">{t("about_teaser_title")}</h3>
          <p className="mt-3 text-gray-700">{t("about_teaser_body")}</p>

          <a
            href={aboutPath}
            className="mt-6 inline-flex items-center rounded-md border px-5 py-3 hover:bg-gray-50"
          >
            {t("about_teaser_cta")}
          </a>
        </div>
      </Container>
    </section>
  );
}

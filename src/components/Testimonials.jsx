import TestimonialCard from "./TestimonialCard";
import { useI18n } from "../i18n";

export default function Testimonials() {
  const { t } = useI18n();

  const items = [
    {
      name: t("testi_1_name"),
      location: t("testi_1_location"),
      quote: t("testi_1_quote"),
      bgClass: "bg-gradient-to-br from-amber-300/20 via-rose-400/20 to-fuchsia-500/25",
      stars: 5,
    },
    {
      name: t("testi_2_name"),
      location: t("testi_2_location"),
      quote: t("testi_2_quote"),
      bgClass: "bg-gradient-to-br from-cyan-300/20 via-sky-500/20 to-indigo-600/25",
      stars: 5,
    },
    {
      name: t("testi_3_name"),
      location: t("testi_3_location"),
      quote: t("testi_3_quote"),
      bgClass: "bg-gradient-to-br from-emerald-300/20 via-teal-400/20 to-green-600/25",
      stars: 5,
    },
    {
      name: t("testi_4_name"),
      location: t("testi_4_location"),
      quote: t("testi_4_quote"),
      bgClass: "bg-gradient-to-br from-purple-300/20 via-violet-500/20 to-indigo-700/25",
      stars: 5,
    },
  ];

  return (
    <section className="bg-black">
      <div className="grid auto-rows-fr md:grid-cols-1 lg:grid-cols-4">
        {items.map((it, i) => (
          <TestimonialCard
            key={i}
            name={it.name}
            location={it.location}
            quote={it.quote}
            rating={it.stars}
            bgClass={it.bgClass}
          />
        ))}
      </div>
    </section>
  );
}

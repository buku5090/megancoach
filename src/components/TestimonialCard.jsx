export default function TestimonialCard({
  image,
  name,
  location,
  quote,
  rating = 5,
  bgClass,
}) {
  return (
    <article className="relative overflow-hidden h-full">
      {/* fundal: gradient / culoare */}
      {image ? (
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className={`absolute inset-0 ${bgClass || "bg-neutral-800"}`} />
      )}

      {/* overlay pt. contrast */}
      <div className="absolute inset-0 bg-black/35" />

      {/* conținut centrat și „puțin mai sus” */}
      <div className="relative z-10 h-full flex flex-col items-center justify-between
                      text-center gap-4 px-8 pt-12 pb-10">
        <p className="text-base leading-relaxed text-white/90 max-w-prose">
          “{quote}”
        </p>

        <div>
          <div className="mt-4">
            <div className="font-semibold text-white">{name}</div>
            <div className="text-xs text-white/70">{location}</div>
          </div>

          <div aria-label={`${rating} ${"stars"}`} className="text-yellow-400 mt-1">
            {"★".repeat(Math.round(rating))}
          </div>
        </div>
      </div>
    </article>
  );
}

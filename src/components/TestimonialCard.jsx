export default function TestimonialCard({ image, name, location, quote, rating }) {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* Imaginea de fundal */}
      <img
        src={image || "https://via.placeholder.com/800x500?text=Placeholder"}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay pentru contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      {/* Conținut testimonial */}
      <div className="relative z-10 text-center text-white px-6 flex flex-col justify-between h-full py-12">
        <div>
          <span className="text-5xl">“</span>
          <h3 className="font-bold text-xl">{name} — {location}</h3>
          <p className="mt-4 text-lg">{quote}</p>
        </div>

        {/* Stelele */}
        <div className="flex justify-center">
          {Array(rating).fill(0).map((_, i) => (
            <span key={i} className="text-teal-300 text-2xl">★</span>
          ))}
        </div>
      </div>
    </div>
  );
}

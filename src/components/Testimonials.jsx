import TestimonialCard from "./TestimonialCard";

const items = [
  {
    name: "Ty T.",
    location: "Wales, UK",
    quote:
      "Megan draws from a wealth of philosophical concepts, established science, and esoteric practices to help me navigate both my internal world and in the shared world...",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1800&auto=format&fit=crop",
    overlay: "light",
    objectPos: "50% 25%",
    stars: 5,
  },
  {
    name: "Maya F.",
    location: "San Diego, CA",
    quote:
      "Megan has committed herself to going deep into understanding embodiment to help guide those of us who need it, with an honest, generous and intelligent spirit...",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1800&auto=format&fit=crop",
    overlay: "dark",
    objectPos: "50% 35%",
    stars: 5,
  },
  {
    name: "Kelly C.",
    location: "Tacoma, WA",
    quote:
      "After reading about embodiment coaching, I knew this was what I was looking for. I needed help working through old patterns by listening to my body’s innate wisdom...",
    img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1800&auto=format&fit=crop",
    overlay: "light",
    objectPos: "50% 30%",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-black">
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => (
          <TestimonialCard
            key={i}
            image={t.img}          // <-- rename: img -> image
            name={t.name}
            location={t.location}
            quote={t.quote}
            rating={t.stars}       // <-- rename: stars -> rating
          />
        ))}
      </div>
    </section>
  );
}

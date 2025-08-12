// src/components/Hero.jsx
import MiniCourse from "./MiniCourse";

export default function Hero() {
  return (
    <>
      <section className="relative min-h-[72vh] md:min-h-[80vh] pb-28 md:pb-36">
        {/* VIDEO BG */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
        >
          {/* pune aici video-ul tău */}
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
        </video>

        {/* OVERLAY pentru contrast */}
        <div className="absolute inset-0 bg-black/45" />

        {/* TITLU + SUBTITLU */}
        <div className="relative z-10 mx-auto max-w-5xl px-4 pt-24 md:pt-28 text-center">
          <h1 className="text-[clamp(36px,6vw,80px)] leading-[1.05] font-serif text-white drop-shadow-sm">
            Embodied Healing.
            <br /> Soulful Transformation.
          </h1>
          <p className="mt-6 text-[clamp(16px,2.2vw,22px)] text-white/90 max-w-3xl mx-auto">
            Somatic coaching to help you break free from old patterns, find
            harmony &amp; embody your True Self.
          </p>
        </div>

        {/* MINI-COURSE suprapus jos */}
        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-full">
          <div className="pointer-events-auto mx-auto max-w-5xl px-4">
            <MiniCourse />
          </div>
        </div>
      </section>

    </>
  );
}

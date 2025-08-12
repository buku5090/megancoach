// src/components/HeroAbout.jsx
export default function HeroAbout() {
  return (
    <section
      className="relative"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?q=80&w=2400&auto=format&fit=crop)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Spațiu mic deasupra cardului */}
      <div className="h-6 lg:h-10" />

      {/* Containerul cardului crem */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="bg-[#f6efe6] rounded-[36px] lg:rounded-[64px] overflow-hidden shadow-sm">
            <div
                className="
                    grid
                    md:grid-cols-2                 /* 2 coloane de la 768px */
                    lg:grid-cols-[0.9fr_1.1fr]     /* proporții custom de la 1024px – observa underscore! */
                    gap-8 md:gap-12
                    items-center
                    px-6 md:px-10 py-10 md:py-12
                "
                >
                {/* FOTO STÂNGA */}
                <div className="flex justify-center lg:justify-start shrink-0">
                    <div className="w-full max-w-[360px] md:max-w-[420px] overflow-hidden rounded-[28px] rounded-t-[120px]">
                    <img
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop"
                        alt="portrait placeholder"
                        className="w-full h-auto object-cover"
                    />
                    </div>
                </div>

                {/* TEXT DREAPTA */}
                <div className="pb-2 min-w-0">
                    <p className="text-[32px] leading-none text-[#b0743a] italic">Hello</p>
                    <h1 className="mt-1 text-[clamp(34px,4vw,56px)] font-semibold">I’m Megan!</h1>
                    <p className="mt-5 text-[18px] text-[#2a2a2a]/85 max-w-xl">
                    I help you break free from old patterns & align more fully with your True Self
                    through reconnecting with the wisdom of your body.
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3">
                    <a href="/programeaza-sesiuni" className="rounded-full bg-[#1a1a1a] text-white px-6 py-3">Schedule a Call</a>
                    <a href="/programe" className="rounded-full border border-[#1a1a1a]/20 px-6 py-3">Work with me</a>
                    </div>
                </div>
            </div>

        </div>
      </div>

      {/* Spațiu sub card */}
      <div className="h-6 lg:h-10" />
      {/* Panglica crem sub card */}
      <div className="h-3 bg-[#f6efe6]" />
    </section>
  );
}

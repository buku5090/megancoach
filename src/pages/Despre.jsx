import HeroAbout from "../components/HeroAbout";


// src/pages/Despre.jsx
export default function Despre() {
  return (
    <main className="bg-[#faf4ec] text-[#1a1a1a]">
      <HeroAbout />

      {/* ===== ABOUT… pe crem simplu ===== */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-3xl font-semibold mb-6">About…</h2>
        <div className="space-y-6 text-lg text-[#2a2a2a]/85">
          <p>
            Megan is a somatic practitioner and spiritual guide specializing in
            feminine embodiment, emotional healing, nervous system regulation &
            deep mind–body connection. (placeholder)
          </p>
          <p>
            With a unique blend of somatic practices, spiritual insight &
            trauma-informed coaching, she works 1:1, with couples & groups,
            online and in person. (placeholder)
          </p>
          <p>
            Trained as a Yoga Teacher, Certified Embodiment Coach & Integrative
            Somatic Trauma Therapist… (placeholder)
          </p>
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
            <h3 className="text-3xl font-semibold mb-6">My journey…</h3>
            <div className="space-y-6 text-lg text-[#1a1a1a]/80">
              <p>
                My journey into somatic and spiritual work began with deep
                disconnection… (placeholder)
              </p>
              <p>
                For years, I lived in my head, trying to think my way into
                healing… (placeholder)
              </p>
              <p>
                Then I discovered somatic and spiritual practices… (placeholder)
              </p>
              <p>
                Now, I help others do the same… (placeholder)
              </p>
            </div>
          </div>
        </div>

        {/* val curbat spre secțiunea neagră */}
        <WaveBottom className="text-black" />
      </section>

      {/* ===== PROFESSIONAL TRAINING pe negru, cu listă ===== */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h3 className="text-3xl font-semibold mb-8">
            Professional Training…
          </h3>

          <ul className="space-y-4 text-lg">
            {[
              "Integrative Somatic Trauma Therapy (ISTT) | 2025 — The Embody Lab",
              "Applied Polyvagal Theory in Yoga | 2023 — The Embody Lab",
              "Certified Embodiment Coach (CEC) | 2022 — Embodiment Unlimited",
              "Certified Trauma Embodiment Coach (TCC) | 2022 — Embodiment Unlimited",
              "Experienced Registered Yoga Teacher (E-RYT) | 2020 — Yoga Alliance",
              "Registered Non-Linear Movement Method Teacher | 2020 — Michaela Boehm",
              "Certified Feminine Embodiment Coach (FEC) | 2019 — School of Embodied Arts",
              "Certified Hypnotherapist (CHt) | 2016 — Hypnotherapy University",
              "BA in Psychology | 2005 — Evergreen State College",
            ].map((t) => (
              <li key={t}>
                <span className="text-[#d9a463]">{t.split("—")[0]}</span>
                <span className="text-white/80"> — {t.split("—")[1] || ""}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* val crem jos pentru tranziție */}
        <WaveBottom className="text-[#f6efe6]" />
      </section>

      {/* ===== FREE MINI-COURSE banner peste fundal marmură ===== */}
      <section
        className="py-20"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1610870379079-36004f0b8cc5?q=80&w=2400&auto=format&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-4xl px-4">
          <div className="bg-[#f6efe6] border border-[#e7d9c9] rounded-2xl p-8 shadow-sm">
            <p className="text-sm font-semibold">Free Mini-Course!</p>
            <h4 className="mt-2 text-3xl font-bold">
              Embodied Awakening: A 3-Day Somatic & Spiritual Reset
            </h4>
            <p className="mt-2 text-[#1a1a1a]/80">
              A transformative journey to align body, mind & spirit. (placeholder)
            </p>

            <form className="mt-6 grid sm:grid-cols-[1fr,220px] gap-3">
              <input
                className="h-12 rounded-full border border-[#e7d9c9] px-5 bg-white/80"
                placeholder="Email *"
                type="email"
              />
              <button className="h-12 rounded-full bg-[#a66834] text-white font-medium">
                Sign me up!
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER simplu + SOCIAL GRID ===== */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="bg-white/70 border border-[#eadfce] rounded-2xl p-8">
          <h4 className="text-3xl font-semibold text-center">
            Subscribe to get exclusive updates
          </h4>
          <form className="mt-6 mx-auto max-w-3xl grid sm:grid-cols-[1fr,260px] gap-3">
            <input
              className="h-12 rounded-md border border-[#eadfce] px-4"
              placeholder="e.g., email@example.com"
              type="email"
            />
            <button className="h-12 rounded-md border-2 border-[#eadfce]">
              Join my Mailing List
            </button>
          </form>
          <label className="mt-3 flex items-center gap-2 text-sm text-[#1a1a1a]/70">
            <input type="checkbox" className="size-4" /> I want to subscribe to
            your mailing list.
          </label>
        </div>

        <div className="mt-14">
          <h5 className="text-4xl font-semibold text-[#b0743a] drop-shadow-sm">
            Let’s Be Social
          </h5>
          <p className="italic mt-2 text-right">@hartcoach</p>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="aspect-square rounded bg-[#e5e0d8]" />
            ))}
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

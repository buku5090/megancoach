import Container from "./Container";

const cards = [
  { title: "Individuals", desc: "1:1 somatic coaching — siguranță, conținere, progres." },
  { title: "Couples", desc: "Relații ancorate în corp, conectare și comunicare." },
  { title: "Groups", desc: "Cercuri, workshop-uri, practici ghidate în siguranță." },
];

export default function WorkWithMe() {
  return (
    <section className="bg-white">
      <Container className="py-16">
        <h3 className="text-2xl font-semibold">I work with…</h3>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <article key={c.title} className="border rounded-xl overflow-hidden hover:shadow-sm">
              <div className="aspect-[4/3] bg-gray-200" />
              <div className="p-5">
                <h4 className="text-lg font-semibold">{c.title}</h4>
                <p className="mt-2 text-gray-600">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <a
            href="/work-with-me"
            className="inline-flex items-center rounded-md bg-black text-white px-5 py-3 hover:opacity-90"
          >
            Work with me
          </a>
        </div>
      </Container>
    </section>
  );
}

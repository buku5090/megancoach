import Container from "./Container";

const items = [
  "Te simți copleșit(ă) sau deconectat(ă) de corp.",
  "E greu să ai încredere în emoții și limite personale.",
  "Cari stres sau traumă nerezolvată care se repetă.",
  "Anxietate / tensiune cronică te epuizează.",
  "Cauți claritate, self-awareness și ancorare.",
];

export default function Reasons() {
  return (
    <section>
      <Container className="py-16">
        <h3 className="text-2xl font-semibold">
          I’m guessing you’re here because…
        </h3>
        <ul className="mt-6 grid md:grid-cols-2 gap-4 text-gray-700">
          {items.map((t, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-black" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

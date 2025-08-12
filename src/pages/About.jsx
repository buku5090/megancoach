export default function About() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-[1fr,1.3fr] gap-10 items-start">
      <div className="aspect-[4/5] rounded-2xl bg-gray-200" />
      <article>
        <h1 className="text-3xl md:text-4xl font-bold">About Me</h1>
        <p className="mt-4 text-gray-700">
          Placeholder bio. Poveste scurtă, valori, formări, abordare. Vom înlocui cu textul tău.
        </p>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border bg-white">
            <h3 className="font-semibold">Approach</h3>
            <p className="text-gray-600 mt-1 text-sm">Somatic, nervous-system informed, trauma-aware (placeholder).</p>
          </div>
          <div className="p-4 rounded-lg border bg-white">
            <h3 className="font-semibold">Offerings</h3>
            <p className="text-gray-600 mt-1 text-sm">1:1, couples, groups, workshops (placeholder).</p>
          </div>
        </div>
      </article>
    </main>
  );
}

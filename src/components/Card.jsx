export function Card({ title, desc }) {
  return (
    <article className="border rounded-xl overflow-hidden hover:shadow-sm bg-white">
      <div className="aspect-[4/3] bg-gray-200" />
      <div className="p-5">
        <h3 className="text-lg font-semibold">{title}</h3>
        {desc && <p className="mt-2 text-gray-600">{desc}</p>}
      </div>
    </article>
  );
}

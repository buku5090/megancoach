// components/Card.jsx
export function Card({ title, desc, imageSrc, imageAlt }) {
  return (
    <article className="border rounded-xl overflow-hidden hover:shadow-sm bg-white group">
      <div className="aspect-[16/10] w-full overflow-hidden bg-gray-200">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt || title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        ) : null}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold">{title}</h3>
        {desc ? <p className="mt-2 text-gray-600">{desc}</p> : null}
      </div>
    </article>
  );
}

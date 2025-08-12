export default function Page({ title, children }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      {title && <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>}
      <div className={title ? "mt-6" : ""}>{children}</div>
    </main>
  );
}

export default function PageTemplate({ title, children }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
      <div className="mt-6 text-gray-700">{children}</div>
    </main>
  );
}

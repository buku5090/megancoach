export default function SectionHeading({ children, sub }) {
  return (
    <header className="mb-6">
      <h2 className="text-2xl font-semibold">{children}</h2>
      {sub && <p className="text-gray-600 mt-1">{sub}</p>}
    </header>
  );
}

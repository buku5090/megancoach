export default function ContactForm() {
  return (
    <form className="grid gap-3 max-w-lg">
      <input className="border rounded px-4 py-2" placeholder="Nume" />
      <input className="border rounded px-4 py-2" placeholder="Email" type="email" />
      <textarea className="border rounded px-4 py-2" placeholder="Mesaj" rows={5} />
      <button className="rounded bg-black text-white px-4 py-2 w-fit">Trimite</button>
    </form>
  );
}

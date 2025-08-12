export default function NewsletterForm() {
  return (
    <form className="flex gap-3">
      <input className="rounded-md border px-4 py-2 w-72" placeholder="Email*" />
      <button className="rounded-md bg-black text-white px-4 py-2">Subscribe</button>
    </form>
  );
}

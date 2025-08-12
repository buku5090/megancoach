import Page from "../components/Page";

export default function Feedback() {
  return (
    <Page title="Feedback">
      <form className="grid gap-3 max-w-xl">
        <input className="border rounded px-4 py-2" placeholder="Nume (opțional)" />
        <input className="border rounded px-4 py-2" placeholder="Oraș (opțional)" />
        <textarea className="border rounded px-4 py-2" placeholder="Testimonialul tău" rows={6} />
        <button className="rounded bg-black text-white px-4 py-2 w-fit">Trimite</button>
      </form>
    </Page>
  );
}

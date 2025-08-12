import Container from "./Container";

export default function MiniCourse() {
  return (
    <section id="mini" className="border-y bg-gray-50">
      <Container className="py-14 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Embodied Awakening — 3-Day Reset
        </h2>
        <p className="mt-2 text-gray-600">
          Primești un mini-curs pe email: 3 exerciții somatice + reflecții.
        </p>

        <form className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <input
            className="w-full sm:w-96 rounded-md border px-4 py-3"
            placeholder="Email*"
            type="email"
          />
          <button className="rounded-md !bg-black text-white px-6 py-3 hover:!opacity-90">
            Sign me up
          </button>
        </form>
      </Container>
    </section>
  );
}

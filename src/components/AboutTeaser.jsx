import Container from "./Container";

export default function AboutTeaser() {
  return (
    <section>
      <Container className="py-16 grid md:grid-cols-2 gap-10 items-center">
        <div className="aspect-[4/5] rounded-2xl bg-gray-200" />
        <div>
          <h3 className="text-2xl font-semibold">Hi, I’m [Your Name]</h3>
          <p className="mt-3 text-gray-700">
            Te ajut să te reconectezi la corp, emoții și înțelepciunea ta interioară — text placeholder.
          </p>
          <a
            href="/despre"
            className="mt-6 inline-flex items-center rounded-md border px-5 py-3 hover:bg-gray-50"
          >
            More about me
          </a>
        </div>
      </Container>
    </section>
  );
}

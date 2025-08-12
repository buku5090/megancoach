import Page from "../components/Page";
import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <Page title="Contact">
      <div className="grid md:grid-cols-2 gap-10">
        <ContactForm />
        <div className="text-sm text-gray-700">
          <p><strong>Email:</strong> hello@yourcoach.test</p>
          <p className="mt-2"><strong>Social:</strong> @yourcoach</p>
          <div className="mt-4 aspect-[4/3] bg-gray-200 rounded" />
        </div>
      </div>
    </Page>
  );
}

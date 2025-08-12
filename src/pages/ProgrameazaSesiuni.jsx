import Page from "../components/Page";
import BookingEmbed from "../components/BookingEmbed";
export default function ProgrameazaSesiuni() {
  return (
    <Page title="Programează o sesiune">
      <p className="text-gray-700 mb-6">
        Alege un interval potrivit. Sesiunea de descoperire e gratuită.
      </p>
      <BookingEmbed />
    </Page>
  );
}

import Page from "../components/Page";
import BookingEmbed from "../components/BookingEmbed";
import { useI18n } from "../i18n";

export default function ProgrameazaSesiuni() {
  const { t } = useI18n();

  return (
    <Page title={t("schedule_page_title")}>
      <p className="text-gray-700 mb-6">
        {t("schedule_intro")}
      </p>
      <BookingEmbed />
    </Page>
  );
}

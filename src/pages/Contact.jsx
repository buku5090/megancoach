import ContactForm from "../pages/ContactForm"; // sau calea ta reală
import { useI18n } from "../i18n";

export default function Contact() {
  const { t } = useI18n();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-[#f5f8fb]">
      {/* blob subtil de fundal */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-200/40 to-indigo-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-tr from-indigo-200/40 to-cyan-200/40 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Header + Address line */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            {t("contact_title")}
          </h1>

          <div className="mt-4 flex items-center justify-center gap-3 text-sm text-neutral-500">
            {/* globe icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" className="text-neutral-400">
              <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2m7.938 9h-3.11A15.64 15.64 0 0 0 16 6.674A8.019 8.019 0 0 1 19.938 11M14 4.263A13.7 13.7 0 0 1 15.854 11H14zM10 4.263V11H8.146A13.7 13.7 0 0 1 10 4.263M4.062 13H7.17A15.64 15.64 0 0 0 8 17.326A8.019 8.019 0 0 1 4.062 13M10 19.737A13.7 13.7 0 0 1 8.146 13H10zm4 0V13h1.854A13.7 13.7 0 0 1 14 19.737M19.938 13A8.019 8.019 0 0 1 16 17.326A15.64 15.64 0 0 0 16.828 13zM8 6.674A15.64 15.64 0 0 0 7.172 11H4.062A8.019 8.019 0 0 1 8 6.674" />
            </svg>

            <span className="font-medium text-neutral-700">{t("contact_country")}</span>
            <span className="select-none">·</span>
            <a className="font-medium text-indigo-600 hover:underline" href="#">{t("contact_lang_code")}</a>
            <span className="select-none">:</span>
            <span>{t("contact_city")}</span>
          </div>
        </div>

        {/* Content: illustration left + form right */}
        <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
          {/* Illustration */}
          <div className="hidden md:block">
            <div className="mx-auto max-w-md rounded-2xl border border-black/5 bg-white/60 p-8 shadow-sm backdrop-blur">
              <EnvelopeIllustration />
            </div>
          </div>

          {/* Form card */}
          <div className="mx-auto w-full max-w-xl">
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-xl sm:p-8">
              <ContactForm />
            </div>
            <p className="mt-3 text-xs text-neutral-500">
              {t("contact_response_note")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnvelopeIllustration() {
  return (
    <svg
      className="h-64 w-full text-cyan-700/70"
      viewBox="0 0 400 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="40" y="20" width="320" height="200" rx="16" stroke="currentColor" strokeWidth="4" fill="none" />
      <path d="M40 60L200 160L360 60" stroke="currentColor" strokeWidth="4" fill="none" />
      <rect x="70" y="40" width="90" height="14" rx="7" fill="currentColor" opacity="0.2" />
      <rect x="70" y="70" width="260" height="10" rx="5" fill="currentColor" opacity="0.2" />
      <rect x="70" y="90" width="220" height="10" rx="5" fill="currentColor" opacity="0.2" />
      <rect x="70" y="110" width="180" height="10" rx="5" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

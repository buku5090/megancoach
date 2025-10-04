// src/components/LanguageToggle.jsx
import { useI18n } from "../i18n";

export default function LanguageToggle({ className = "" }) {
  const { lang, setLang, t } = useI18n();
  const next = lang === "ro" ? "en" : "ro";

  return (
    <button
      onClick={() => setLang(next)}
      className={`px-3 py-1 rounded border text-sm hover:bg-gray-100 ${className}`}
      aria-label={t("lang_aria")}
      title={t("lang_title")}
    >
      {lang.toUpperCase()}
    </button>
  );
}

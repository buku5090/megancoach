// src/components/Footer.jsx
import { NavLink } from "react-router-dom";
import { useI18n } from "../i18n";

export default function Footer() {
  const { t, lang } = useI18n();

  // dacă vei avea rute diferite pe EN, schimbă aici
  const faqPath = lang === "ro" ? "/faq" : "/faq";
  const privacyPath = lang === "ro" ? "/privacy" : "/privacy";
  const termsPath = lang === "ro" ? "/terms" : "/terms";
  // ex: en: "/privacy-policy", "/terms-of-service"

  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-2 gap-6">
        <div className="text-sm text-gray-600">
          © {new Date().getFullYear()} {t("footer_brand")} — {t("footer_rights")}
        </div>
        <div className="md:text-right text-sm space-x-4">
          <NavLink to={faqPath}>{t("footer_faq")}</NavLink>
          <NavLink to={privacyPath}>{t("footer_privacy")}</NavLink>
          <NavLink to={termsPath}>{t("footer_terms")}</NavLink>
        </div>
      </div>
    </footer>
  );
}

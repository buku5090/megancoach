// src/components/ChatWidget.jsx
import { useI18n } from "../i18n";

export default function ChatWidget() {
  const { t } = useI18n();
  const phone = "40745388929";
  const preset = t("whatsapp_preset");
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(preset)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 rounded-full px-4 py-3 bg-emerald-600 z-10 text-white shadow-lg hover:opacity-90"
    >
      {t("chat")}
    </a>
  );
}

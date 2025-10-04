import { useState } from "react";
import { useI18n } from "../i18n";

export default function FAQ() {
  const { t } = useI18n();

  const faqs = [
    { q: t("faq_item_1_q"), a: t("faq_item_1_a") },
    { q: t("faq_item_2_q"), a: t("faq_item_2_a") },
    { q: t("faq_item_3_q"), a: t("faq_item_3_a") },
    { q: t("faq_item_4_q"), a: t("faq_item_4_a") },
  ];

  return (
    <div style={styles.wrap}>
      <div style={styles.container}>
        <h1 style={styles.title}>{t("faq_title")}</h1>
        <p style={styles.subtitle}>{t("faq_subtitle")}</p>
        <div style={styles.list}>
          {faqs.map((item, i) => <Accordion key={i} {...item} />)}
        </div>
      </div>
    </div>
  );
}

function Accordion({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={styles.item}>
      <button style={styles.header} onClick={() => setOpen(o => !o)}>
        <span className="font-extrabold">{q}</span>
        <span style={{ transform: `rotate(${open ? 45 : 0}deg)`, transition: "transform .2s" }}>＋</span>
      </button>
      {open && <div style={styles.content}>{a}</div>}
    </div>
  );
}

const styles = {
  wrap: { minHeight: "100vh", background: "#0b0b12", color: "#fff", padding: "48px 24px" },
  container: { maxWidth: 900, margin: "0 auto" },
  title: { fontSize: 36, marginBottom: 8 },
  subtitle: { opacity: 0.8, marginBottom: 24 },
  list: { display: "grid", gap: 12 },
  item: { border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, overflow: "hidden", background: "rgba(255,255,255,0.03)" },
  header: { width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 18px", color: "#fff", background: "transparent", border: "none", cursor: "pointer", fontSize: 16, textAlign: "left" },
  content: { padding: "0 18px 16px", opacity: 0.9, lineHeight: 1.6 }
};

import { useState } from "react";

const faqs = [
  { q: "Ce este Megancoach?", a: "O platformă pentru coaching & blog, cu resurse și articole." },
  { q: "Aveți sesiuni 1:1?", a: "Da, în funcție de disponibilitate. Detalii pe pagina de servicii." },
  { q: "Cum mă abonez la newsletter?", a: "Găsești formularul în footer sau pe pagina Blog." },
  { q: "Pot propune subiecte de articole?", a: "Sigur! Trimite-ne un mesaj din pagina Contact." },
];

export default function FAQ() {
  return (
    <div style={styles.wrap}>
      <div style={styles.container}>
        <h1 style={styles.title}>Întrebări frecvente</h1>
        <p style={styles.subtitle}>Răspunsuri scurte la întrebările populare.</p>
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

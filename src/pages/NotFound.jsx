import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <div style={styles.code}>404</div>
        <h1 style={styles.title}>Ups! Pagina nu a fost găsită.</h1>
        <p style={styles.subtitle}>
          Link-ul poate fi greșit sau pagina a fost mutată.
        </p>
        <div style={styles.actions}>
          <Link to="/" style={styles.btnPrimary}>Înapoi acasă</Link>
          <Link to="/faq" style={styles.btnGhost}>Vezi FAQ</Link>
        </div>
      </div>
      <div style={styles.bgGlow} />
    </div>
  );
}

const styles = {
  wrap: { minHeight: "100vh", display: "grid", placeItems: "center", background: "#0b0b12", color: "#fff", padding: "24px" },
  card: { position: "relative", maxWidth: 640, width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 32, textAlign: "center", backdropFilter: "blur(6px)" },
  code: { fontSize: 88, fontWeight: 800, letterSpacing: 6, opacity: 0.9, marginBottom: 8 },
  title: { fontSize: 28, margin: "8px 0" },
  subtitle: { opacity: 0.8, marginBottom: 20 },
  actions: { display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" },
  btnPrimary: { background: "#6c5ce7", color: "#fff", padding: "10px 16px", borderRadius: 12, textDecoration: "none", fontWeight: 600 },
  btnGhost: { border: "1px solid rgba(255,255,255,0.2)", color: "#fff", padding: "10px 16px", borderRadius: 12, textDecoration: "none", fontWeight: 600 },
  bgGlow: { position: "absolute", inset: 0, background: "radial-gradient(600px 200px at 50% 0%, rgba(108,92,231,0.25), transparent)", zIndex: -1 }
};

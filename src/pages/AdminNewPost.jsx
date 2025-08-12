/* eslint-disable no-undef */
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

// Citește din .env
const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN;
const FN_URL = import.meta.env.VITE_CREATE_POST_URL;

export default function AdminNewPost() {
  const [params] = useSearchParams();
  const [hasAccess, setHasAccess] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [cover, setCover] = useState("");
  const [tags, setTags] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  // Verifică token
  useEffect(() => {
    const urlKey = params.get("key");
    const saved = localStorage.getItem("admin_token");
    if (urlKey && urlKey === ADMIN_TOKEN) {
      localStorage.setItem("admin_token", urlKey);
      setHasAccess(true);
      setChecking(false);
      return;
    }
    if (saved && saved === ADMIN_TOKEN) {
      setHasAccess(true);
      setChecking(false);
      return;
    }
    setChecking(false);
  }, [params]);

  function trySetToken(input) {
    if (input === ADMIN_TOKEN) {
      localStorage.setItem("admin_token", input);
      setHasAccess(true);
      setError("");
    } else {
      setError("Token invalid.");
    }
  }

  const autoSlug = useMemo(() => {
    if (!title) return "";
    return title
      .toLowerCase()
      .normalize("NFD").replace(/\p{Diacritic}/gu, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 80);
  }, [title]);

  useEffect(() => {
    if (!slug) setSlug(autoSlug);
  }, [autoSlug, slug]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !slug || !content) {
      alert("Titlu, slug și conținut sunt obligatorii.");
      return;
    }
    if (!FN_URL) {
      alert("Nu ai setat URL-ul funcției în .env");
      return;
    }

    const payload = {
      title,
      slug,
      cover: cover ? cover.trim() : null,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      excerpt: excerpt || "",
      content
    };

    const cleanedCover = cover.trim();
        if (cleanedCover && !/^https?:\/\/\S+\.\S+/.test(cleanedCover)) {
        alert("Link-ul cover nu este valid.");
        return;
    }


    try {
      setSaving(true);
      const res = await fetch(FN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": ADMIN_TOKEN
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${res.status}`);
      }

      const data = await res.json();
      alert(`Post creat cu id: ${data.id}`);
      setTitle(""); setSlug(""); setCover(""); setTags(""); setExcerpt(""); setContent("");
    } catch (err) {
      console.error(err);
      alert(`Eroare la salvare: ${err.message}`);
    } finally {
      setSaving(false);
    }
  }

  if (checking) return <div style={styles.loading}>Verific...</div>;
  if (!hasAccess) return <TokenGate onSubmit={trySetToken} error={error} />;

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Creează post nou</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <Field label="Titlu" value={title} onChange={setTitle} required />
        <Field label="Slug" value={slug} onChange={setSlug} placeholder={autoSlug} required />
        <Field label="Cover (URL)" value={cover} onChange={setCover} placeholder="https://..." />
        <Field label="Tags (virgulă între ele)" value={tags} onChange={setTags} placeholder="coaching, mindset" />
        <Field label="Excerpt" value={excerpt} onChange={setExcerpt} textarea rows={3} />
        <Field label="Conținut" value={content} onChange={setContent} textarea rows={12} required />
        <button type="submit" style={styles.button} disabled={saving}>
          {saving ? "Se salvează..." : "Publică"}
        </button>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, textarea, rows=4, required, placeholder }) {
  return (
    <label style={styles.field}>
      <span style={styles.label}>
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </span>
      {textarea ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} style={styles.input} placeholder={placeholder} />
      ) : (
        <input value={value} onChange={e => onChange(e.target.value)} style={styles.input} placeholder={placeholder} />
      )}
    </label>
  );
}

function TokenGate({ onSubmit, error }) {
  const [val, setVal] = useState("");
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Admin Access</h1>
      <p>Introdu tokenul de administrator pentru a continua.</p>
      <input value={val} onChange={e => setVal(e.target.value)} placeholder="Token" style={{ ...styles.input, maxWidth: 300, marginBottom: 8 }} />
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
      <button style={styles.button} onClick={() => onSubmit(val)}>Continuă</button>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#fff", color: "#000", padding: "32px 18px", maxWidth: 800, margin: "0 auto" },
  title: { fontSize: 28, marginBottom: 16 },
  form: { display: "grid", gap: 12 },
  field: { display: "grid", gap: 6 },
  label: { fontSize: 14, fontWeight: 600 },
  input: { border: "1px solid #ccc", padding: "10px 12px", borderRadius: 6, fontSize: 14 },
  button: { background: "#007bff", color: "#fff", border: "none", padding: "10px 14px", borderRadius: 6, fontWeight: 600, cursor: "pointer", marginTop: 8 },
  loading: { minHeight: "100vh", display: "grid", placeItems: "center", fontSize: 18 }
};

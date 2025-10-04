/* eslint-disable no-unused-vars */
import { useState } from "react";

// --- sus, lângă celelalte importuri/config ---
import fs from "fs/promises";
import path from "path";
import { useI18n } from "../i18n";

const SUBS_FILE = path.resolve("./subscribers.json");
async function readSubs() {
  try {
    const txt = await fs.readFile(SUBS_FILE, "utf8");
    return JSON.parse(txt);
  } catch {
    return { subscribers: [] };
  }
}
async function writeSubs(data) {
  await fs.writeFile(SUBS_FILE, JSON.stringify(data, null, 2));
}
const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // 'success' | 'error' | 'already' | null
  const [loading, setLoading] = useState(false);
  const { t } = useI18n();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      setStatus(null);

      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const json = await res.json();
      if (!res.ok || !json?.ok) throw new Error(json?.error || t("newsletter_error_generic"));

      setEmail("");
      setStatus(json.already ? "already" : "success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder={t("newsletter_email_placeholder")}
        className="rounded-md border px-4 py-2 w-72"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-black text-white px-4 py-2 hover:opacity-90 disabled:opacity-60"
      >
        {loading ? t("newsletter_loading") : t("newsletter_submit")}
      </button>

      {status === "success" && (
        <p className="text-green-600 text-sm mt-2 sm:mt-0">{t("newsletter_success")}</p>
      )}
      {status === "already" && (
        <p className="text-neutral-700 text-sm mt-2 sm:mt-0">{t("newsletter_already")}</p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-sm mt-2 sm:mt-0">{t("newsletter_error_prefix")}</p>
      )}
    </form>
  );
}

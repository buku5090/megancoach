import { useState } from "react";
import { useI18n } from "../i18n";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const { t } = useI18n();

  async function onSubmit(e) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const payload = Object.fromEntries(form.entries());

    if (!payload.firstName || !payload.lastName || !payload.email || !payload.message) {
      alert(t("contact_required_fields_alert"));
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      console.log("Resend message id:", json?.id);
      if (!res.ok || !json?.ok) throw new Error(json?.error || t("contact_send_error_backend"));

      formEl.reset();
      alert(t("contact_thanks_alert"));
    } catch (err) {
      console.error(err);
      alert(t("contact_send_error_alert"));
    } finally {
      setLoading(false);
    }
  }

  const input =
    "h-12 w-full rounded-full border border-neutral-200 bg-white px-5 text-[15px] text-neutral-800 placeholder-neutral-400 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";

  return (
    <form onSubmit={onSubmit} className="grid gap-3" noValidate>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input className={input} name="firstName" placeholder={t("contact_first_name_placeholder")} required />
        <input className={input} name="lastName" placeholder={t("contact_last_name_placeholder")} required />
      </div>
      <input className={input} name="email" type="email" placeholder={t("contact_email_placeholder")} required />
      <textarea
        className="min-h-[120px] w-full rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-[15px] text-neutral-800 placeholder-neutral-400 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        name="message"
        placeholder={t("contact_message_placeholder")}
        rows={5}
        required
      />
      <button
        className="mt-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 ring-1 ring-inset ring-white/10 transition hover:brightness-105 active:scale-[0.99]"
        type="submit"
        disabled={loading}
      >
        {loading ? t("contact_send_loading") : t("contact_send_submit")}
      </button>
    </form>
  );
}

// src/components/MiniCourse.jsx
import { useState } from "react";
import Container from "./Container";
import { useI18n } from "../i18n";

export default function MiniCourse() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const { t } = useI18n();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setErrorMsg(data?.message || data?.error || t("mini_error_subscribe"));
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg(t("mini_error_connection"));
    }
  };

  return (
    <section id="mini" className="border-y bg-gray-50">
      <Container className="py-14 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold">
          {t("mini_title")}
        </h2>

        <p className="mt-2 text-gray-600">
          {t("mini_desc")}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <input
            className="w-full sm:w-96 rounded-md border px-4 py-3"
            placeholder={t("mini_email_placeholder")}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="rounded-md !bg-black text-white px-6 py-3 hover:!opacity-90">
            {status === "loading" ? t("mini_loading") : t("mini_submit")}
          </button>
        </form>

        {status === "success" && (
          <p className="mt-3 text-green-600">{t("mini_success")}</p>
        )}
        {status === "error" && (
          <p className="mt-3 text-red-600">
            {t("mini_error_prefix")} {errorMsg}
          </p>
        )}

        <p className="mt-2 text-xs text-gray-500">
          {t("mini_consent")}
        </p>
      </Container>
    </section>
  );
}

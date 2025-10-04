/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "./locales/en/translation.json";
import ro from "./locales/ro/translation.json";

const I18nCtx = createContext({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

const DICT = { en, ro };

function detectInitialLang() {
  // 1) verifică dacă există deja o preferință salvată
  const saved = localStorage.getItem("lang");
  if (saved === "ro" || saved === "en") return saved;

  // 2) detectează automat din navigator.language
  const nav = (navigator.language || "en").toLowerCase();
  if (nav.startsWith("ro")) return "ro";

  // 3) fallback
  return "en";
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState("en");

  useEffect(() => {
    setLangState(detectInitialLang());
  }, []);

  const setLang = (lng) => {
    setLangState(lng);
    localStorage.setItem("lang", lng);
  };

  const t = (key) => {
    return DICT[lang]?.[key] ?? key;
  };

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  return useContext(I18nCtx);
}

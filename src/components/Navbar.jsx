import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useI18n } from "../i18n";
import LanguageToggle from "./LanguageToggle";

const LINKS = [
  { to: "/", key: "nav_home" },
  { to: "/despre", key: "nav_about" },
  { to: "/programe", key: "nav_work" },
  { to: "/blog", key: "nav_blog" },
  { to: "/contact", key: "nav_contact" },
];

const linkBase = "relative px-2 py-1 transition-colors";
const linkClass = ({ isActive }) =>
  [
    linkBase,
    isActive ? "text-[#b0743a]" : "text-neutral-700 hover:text-neutral-900",
  ].join(" ");

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { t, lang } = useI18n();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = original);
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const schedulePath = lang === "ro" ? "/programeaza-sesiuni" : "/programeaza-sesiuni";

  return (
    <header
      className={[
        "sticky top-0 z-50 backdrop-blur-lg",
        scrolled ? "bg-white/80 border-b border-black/10" : "bg-white/50 border-b border-transparent",
        "transition-colors",
      ].join(" ")}
    >
      <div className="mx-auto max-w-6xl h-20 px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="size-12 rounded-full grid place-items-center overflow-hidden ring-1 ring-black/10">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/meganhart-f65e3.firebasestorage.app/o/ChatGPT%20Image%20Aug%2024%2C%202025%20at%2008_30_18%20PM.png?alt=media&token=372fe5e9-f7db-4a47-a02d-43e1fe6d0233"
              alt={t("logo_alt")}
              className="w-10 h-10 object-cover rounded-full"
            />
          </div>
          <span className="sr-only">{t("nav_home")}</span>
        </Link>

        {/* Desktop nav (doar >= lg) */}
        <nav className="hidden lg:flex items-center gap-10">
          {LINKS.map(({ to, key }) => (
            <NavLink key={to} to={to} className={linkClass}>
              {({ isActive }) => (
                <span className="inline-block relative">
                  {t(key)}
                  <span
                    className={[
                      "absolute left-0 -bottom-1 h-[2px] bg-[#b0743a] transition-all",
                      isActive ? "w-full opacity-100" : "w-0 opacity-0",
                    ].join(" ")}
                  />
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          <Link
            to={schedulePath}
            className="hidden lg:inline-flex items-center rounded-full bg-neutral-900 text-white font-semibold px-5 py-2.5 shadow hover:opacity-90"
          >
            {t("cta_schedule_call")}
          </Link>

          <div className="hidden lg:block">
            <LanguageToggle />
          </div>

          {/* Burger (până la lg) */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t("a11y_open_menu")}
            className="lg:hidden inline-flex items-center justify-center rounded-lg p-2 text-neutral-700 hover:bg-black/5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6">
              <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={[
          "fixed inset-0 z-50 bg-black/30 transition-opacity",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      {/* Mobile drawer: alb, rotunjit, puțin mai lat pe tablete */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t("a11y_mobile_menu")}
        className={[
          "fixed right-0 top-0 z-[60] h-dvh w-[86%] max-w-sm sm:max-w-md bg-white border-l border-black/10 p-4 shadow-2xl rounded-l-3xl",
          "transition-transform",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <div className="size-10 rounded-full overflow-hidden ring-1 ring-black/10">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/meganhart-f65e3.firebasestorage.app/o/ChatGPT%20Image%20Aug%2024%2C%202025%20at%2008_30_18%20PM.png?alt=media&token=372fe5e9-f7db-4a47-a02d-43e1fe6d0233"
                alt={t("logo_alt")}
                className="w-10 h-10 object-cover rounded-full"
              />
            </div>
          </Link>

          <button
            onClick={() => setOpen(false)}
            aria-label={t("a11y_close_menu")}
            className="rounded-lg p-2 text-neutral-700 hover:bg-black/5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6">
              <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="mt-4 space-y-1">
          {LINKS.map(({ to, key }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                "block px-3 py-3 rounded-xl text-base " +
                (isActive ? "text-[#b0743a] bg-black/5" : "text-neutral-800 hover:bg-black/5")
              }
            >
              {t(key)}
            </NavLink>
          ))}

          <Link
            to={schedulePath}
            onClick={() => setOpen(false)}
            className="mt-2 block text-center rounded-full bg-neutral-900 text-white font-semibold px-4 py-2"
          >
            {t("cta_schedule_call")}
          </Link>

          <div className="pt-3 border-t border-black/10 mt-3">
            <LanguageToggle className="w-full" />
          </div>
        </div>
      </aside>
    </header>
  );
}

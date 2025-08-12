// src/components/Navbar.jsx
import { NavLink, Link } from "react-router-dom";

const linkBase =
  "px-2 py-1 transition-colors duration-200";
const getLinkClass = ({ isActive }) =>
  [
    linkBase,
    isActive ? "text-[#b0743a]" : "text-white/90 hover:text-white",
  ].join(" ");

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/80">
      <div className="mx-auto max-w-6xl h-20 px-4 flex items-center justify-between">
        {/* Logo stânga */}
        <Link to="/" className="flex items-center gap-3">
          <div className="size-11 rounded-full bg-white grid place-items-center">
            <span className="text-black font-semibold tracking-wide">MH</span>
          </div>
        </Link>

        {/* Meniu central (desktop) */}
        <nav className="hidden md:flex items-center gap-14">
          <NavLink to="/" className={getLinkClass}>home</NavLink>
          <NavLink to="/despre" className={getLinkClass}>about</NavLink>
          <NavLink to="/work-with-me" className={getLinkClass}>work with me</NavLink>
          <NavLink to="/blog" className={getLinkClass}>blog</NavLink>
        </nav>

        {/* CTA dreapta */}
        <Link
          to="/programeaza-sesiuni"
          className="hidden sm:inline-flex items-center rounded-full bg-[#bfeee3] text-black font-semibold px-5 py-2.5 shadow hover:brightness-95"
        >
          Schedule a Call
        </Link>

        {/* Mobile: burger simplu (opțional) */}
        <details className="md:hidden relative">
          <summary className="list-none cursor-pointer text-white/90 px-2 py-1 rounded hover:bg-white/10">
            ☰
          </summary>
          <div className="absolute right-0 mt-2 w-56 rounded-lg bg-black/95 border border-white/10 p-2">
            <NavItem to="/">home</NavItem>
            <NavItem to="/despre">about</NavItem>
            <NavItem to="/work-with-me">work with me</NavItem>
            <NavItem to="/blog">blog</NavItem>
            <Link
              to="/programeaza-sesiuni"
              className="mt-2 block text-center rounded-full bg-[#bfeee3] text-black font-semibold px-4 py-2"
            >
              Schedule a Call
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}

/* Sub-componentă mică pentru item-urile din meniul mobil */
function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        "block px-3 py-2 rounded " +
        (isActive ? "text-[#b0743a]" : "text-white/90 hover:text-white")
      }
    >
      {children}
    </NavLink>
  );
}

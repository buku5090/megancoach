import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-2 gap-6">
        <div className="text-sm text-gray-600">
          © {new Date().getFullYear()} YourCoach — All rights reserved.
        </div>
        <div className="md:text-right text-sm space-x-4">
          <NavLink to="/faq">FAQ</NavLink>
          <NavLink to="/privacy">Privacy</NavLink>
          <NavLink to="/terms">Terms</NavLink>
        </div>
      </div>
    </footer>
  );
}

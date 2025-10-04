import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";

const LOGIN_KEY = "admin";

function useQuery() { const { search } = useLocation(); return new URLSearchParams(search); }

export default function LoginHidden() {
  const q = useQuery();
  const nav = useNavigate();
  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    setAllowed((q.get("key") || "") === LOGIN_KEY);
    setChecking(false);
  }, []);

  useEffect(() => {
    if (!allowed) return;
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) nav(q.get("redirect") || "/blog", { replace: true });
    });
    return () => unsub();
  }, [allowed]);

  if (checking) return <div className="min-h-screen grid place-items-center">...</div>;
  if (!allowed) return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="max-w-sm w-full border rounded-xl p-6">
        <h1 className="text-lg font-semibold">Acces restricționat</h1>
        <p className="text-sm opacity-70 mt-1">Această pagină este disponibilă doar prin link.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen grid place-items-center p-6 bg-neutral-950 text-white">
      <div className="max-w-sm w-full border border-white/10 rounded-2xl p-6 bg-neutral-900">
        <h1 className="text-lg font-semibold">Login admin</h1>
        <p className="text-sm text-white/70 mt-1">Autentifică-te cu Google.</p>
        <button onClick={() => signInWithPopup(auth, googleProvider)}
          className="mt-4 w-full rounded-xl px-4 py-2 font-semibold bg-white text-black">
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

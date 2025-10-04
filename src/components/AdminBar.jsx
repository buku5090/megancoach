import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { isAdmin } from "../admin";
import { Link } from "react-router-dom";

export default function AdminBar() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => { setUser(u || null); setReady(true); });
    return () => unsub();
  }, []);

  if (!ready || !isAdmin(user)) return null;

  return (
    <div className="sticky top-0 z-30 bg-neutral-900/90 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-5xl px-4 py-2 flex items-center justify-between text-sm text-white">
        <div><span className="opacity-80">Admin:</span> <span className="font-medium">{user.email}</span></div>
        <div className="flex items-center gap-3">
          <Link to="/admin/new-post" className="px-3 py-1 rounded-lg bg-white text-black font-semibold">Creează post</Link>
          <Link to="/admin/newsletter" className="px-3 py-1 rounded-lg border border-white/20">Newsletter</Link>
          <button onClick={() => signOut(auth)} className="px-3 py-1 rounded-lg border border-white/20 hover:bg-white/10">Logout</button>
        </div>
      </div>
    </div>
  );
}

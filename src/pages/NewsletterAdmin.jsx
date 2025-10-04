import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { isAdmin } from "../admin";
import AdminBar from "../components/AdminBar";

export default function NewsletterAdmin(){
  const [user,setUser]=useState(null);
  const [subject,setSubject]=useState("");
  const [body,setBody]=useState("");
  const [test,setTest]=useState(true);
  const [sending,setSending]=useState(false);

  useEffect(()=> onAuthStateChanged(auth, u => setUser(u || null)),[]);

  async function sendBroadcast(e){
    e.preventDefault();
    if(!isAdmin(user)) { alert("Doar admin."); return; }
    if(!subject || !body) { alert("Subject și conținut obligatorii."); return; }
    try{
      setSending(true);
      const token = await user.getIdToken(true);
      const res = await fetch("/api/newsletter/broadcast", {
        method: "POST",
        headers: { "Content-Type":"application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({
          subject,
          html: `<div style="font:14px/1.5 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Arial">${body.replace(/\n/g,"<br/>")}</div>`,
          text: body,
          test: !!test
        })
      });
      const json = await res.json().catch(()=>null);
      if(!res.ok) throw new Error(json?.error || `HTTP ${res.status}`);
      alert(`Trimis: ${json.sent}, Eșuat: ${json.failed}`);
    }catch(err){ alert(`Eroare: ${err.message}`); }
    finally{ setSending(false); }
  }

  return (
    <div>
      <AdminBar/>
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="text-2xl font-bold mb-4">Newsletter broadcast</h1>
        {!isAdmin(user) ? <p className="text-sm opacity-70">Autentifică-te ca admin.</p> : (
          <form onSubmit={sendBroadcast} className="grid gap-4">
            <input className="w-full rounded-lg border px-3 py-2 bg-white text-black" placeholder="Subiect"
                   value={subject} onChange={e=>setSubject(e.target.value)} />
            <textarea rows={10} className="w-full rounded-lg border px-3 py-2 bg-white text-black" placeholder="Conținut"
                   value={body} onChange={e=>setBody(e.target.value)} />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={test} onChange={e=>setTest(e.target.checked)} />
              Trimite ca TEST (numai către tine)
            </label>
            <button type="submit" disabled={sending} className="rounded-xl px-4 py-2 font-semibold bg-black text-white disabled:opacity-50">
              {sending ? "Se trimite…" : "Trimite broadcast"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

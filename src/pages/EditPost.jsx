import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { isAdmin } from "../admin";
import { doc, getDoc, setDoc, serverTimestamp, deleteDoc } from "firebase/firestore";

function slugify(s){
  return String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .replace(/[^a-z0-9\s-]/g,"").trim().replace(/\s+/g,"-").slice(0,80);
}

export default function EditPost(){
  const { slug: routeSlug } = useParams();
  const nav = useNavigate();

  const [user,setUser]=useState(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");

  const [title,setTitle]=useState("");
  const [slug,setSlug]=useState(routeSlug || "");
  const [tagsArr,setTagsArr]=useState([]);
  const [tagInput,setTagInput]=useState("");
  const [excerpt,setExcerpt]=useState("");
  const [content,setContent]=useState("");
  const [saving,setSaving]=useState(false);

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, u => setUser(u || null));
    return () => unsub();
  },[]);

  useEffect(()=>{
    (async ()=>{
      try{
        const ref = doc(db,"blogPosts", routeSlug);
        const snap = await getDoc(ref);
        if(!snap.exists()) { setError("Articolul nu există."); return; }
        const p = snap.data();
        setTitle(p.title || "");
        setSlug(p.slug || routeSlug);
        setTagsArr(Array.isArray(p.tags)?p.tags:[]);
        setExcerpt(p.excerpt || "");
        setContent(p.content || "");
      }catch(e){ setError(e?.message || "Eroare"); }
      finally{ setLoading(false); }
    })();
  },[routeSlug]);

  function addTagFromInput(){
    const v = tagInput.trim(); if(!v) return;
    const pieces = v.split(",").map(t=>slugify(t).replace(/-+/g,"-")).filter(Boolean);
    setTagsArr(Array.from(new Set([...tagsArr, ...pieces])).slice(0,12));
    setTagInput("");
  }
  function handleTagKey(e){ if(e.key==="Enter"||e.key===","){ e.preventDefault(); addTagFromInput(); } }
  function removeTag(t){ setTagsArr(tagsArr.filter(x=>x!==t)); }

  async function save(e){
    e.preventDefault();
    if(!isAdmin(user)) { alert("Doar admin."); return; }
    if(!title || !slug || !content){ alert("Titlu, slug și conținut sunt obligatorii."); return; }
    const safeSlug = slugify(slug) || slugify(title);
    try{
      setSaving(true);
      const ref = doc(db,"blogPosts", routeSlug);           // doc curent
      const refNew = doc(db,"blogPosts", safeSlug);         // doc nou dacă schimbăm slug-ul
      const now = serverTimestamp();

      if (safeSlug !== routeSlug) {
        // migrare doc (simplu: creăm noul + ștergem vechiul)
        await setDoc(refNew, {
          title, slug: safeSlug, tags: tagsArr, excerpt, content,
          updatedAt: now, createdAt: serverTimestamp() // sau copiază createdAt din vechi dacă vrei
        }, { merge: true });
        await deleteDoc(ref);
      } else {
        await setDoc(ref, {
          title, slug: safeSlug, tags: tagsArr, excerpt, content, updatedAt: now
        }, { merge: true });
      }
      alert("Salvat.");
      nav(`/blog/${safeSlug}`, { replace: true });
    }catch(err){ console.error(err); alert(err.message); }
    finally{ setSaving(false); }
  }

  async function removePost(){
    if(!isAdmin(user)) { alert("Doar admin."); return; }
    if(!confirm("Sigur ștergi articolul?")) return;
    await deleteDoc(doc(db,"blogPosts", routeSlug));
    alert("Șters.");
    nav("/blog");
  }

  if(loading) return <div className="p-6">Se încarcă…</div>;
  if(error) return <div className="p-6 text-red-400">{error}</div>;

  return (
    <div className="mx-auto max-w-5xl p-6 text-white">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Editează: {routeSlug}</h1>
        <div className="flex gap-2">
          <button onClick={removePost} className="px-3 py-2 rounded-lg border border-red-500 text-red-300">Șterge</button>
          <button form="editForm" type="submit" disabled={saving} className="px-3 py-2 rounded-lg bg-white text-black">
            {saving ? "Se salvează…" : "Salvează"}
          </button>
        </div>
      </header>

      <form id="editForm" onSubmit={save} className="grid gap-4">
        <Field label="Titlu" value={title} onChange={setTitle} />
        <Field label="Slug" value={slug} onChange={(v)=>setSlug(slugify(v))} />
        <div className="grid gap-2">
          <label className="text-sm font-medium">Tag-uri</label>
          <div className="flex flex-wrap gap-2">
            {tagsArr.map(t=>(
              <span key={t} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-neutral-800 border border-white/10 text-xs">
                {t}<button type="button" onClick={()=>removeTag(t)} className="opacity-70 hover:opacity-100">×</button>
              </span>
            ))}
            <input value={tagInput} onChange={e=>setTagInput(e.target.value)} onKeyDown={handleTagKey}
              onBlur={addTagFromInput} placeholder="scrie tag și Enter/virgulă"
              className="min-w-[180px] bg-neutral-800 border border-white/10 rounded-full px-3 py-1 text-xs outline-none" />
          </div>
        </div>
        <Field label="Excerpt" value={excerpt} onChange={setExcerpt} textarea rows={3} />
        <Field label="Conținut" value={content} onChange={setContent} textarea rows={14} />
      </form>
    </div>
  );
}

function Field({ label, value, onChange, textarea, rows=4 }){
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium">{label}</span>
      {textarea ? (
        <textarea value={value} onChange={e=>onChange(e.target.value)} rows={rows}
          className="w-full rounded-xl bg-neutral-800 border border-white/10 px-3 py-2 text-sm outline-none"/>
      ) : (
        <input value={value} onChange={e=>onChange(e.target.value)}
          className="w-full rounded-xl bg-neutral-800 border border-white/10 px-3 py-2 text-sm outline-none"/>
      )}
    </label>
  );
}

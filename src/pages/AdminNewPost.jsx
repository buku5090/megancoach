/* src/pages/AdminNewPost.jsx */
import { useEffect, useMemo, useRef, useState } from "react";
import { auth, db, googleProvider, storage } from "../firebase";
import { onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";

function slugify(s){
  return String(s||"").toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .replace(/[^a-z0-9\s-]/g,"").trim()
    .replace(/\s+/g,"-").slice(0,80);
}

// --- mici utils pentru upload & resize ---
function readFileAsDataURL(file){
  return new Promise((res,rej)=>{
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}
async function resizeImage(file, maxSize = 1600, quality = 0.9){
  // păstrează proporțiile; redimensionează doar dacă depășește maxSize
  const dataUrl = await readFileAsDataURL(file);
  const img = document.createElement("img");
  await new Promise((ok, err)=>{
    img.onload = ok;
    img.onerror = err;
    img.src = dataUrl;
  });
  const { width, height } = img;
  const needResize = Math.max(width, height) > maxSize;
  if(!needResize) return file;

  const scale = maxSize / Math.max(width, height);
  const w = Math.round(width * scale);
  const h = Math.round(height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, w, h);
  const mime = file.type === "image/png" ? "image/png" : "image/jpeg";
  const blob = await new Promise((res)=> canvas.toBlob(res, mime, quality));
  return new File([blob], file.name.replace(/\.(png|jpg|jpeg|webp)$/i,"") + (mime==="image/png"?".png":".jpg"), { type: mime });
}

export default function AdminNewPost(){
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState(null);

  // form state
  const [title,setTitle]=useState("");
  const [slug,setSlug]=useState("");
  const [slugTouched,setSlugTouched]=useState(false);
  const [tagsArr,setTagsArr]=useState([]);
  const [tagInput,setTagInput]=useState("");
  const [excerpt,setExcerpt]=useState("");
  const [content,setContent]=useState("");
  const [saving,setSaving]=useState(false);

  // images state
  const [coverUrl, setCoverUrl] = useState("");
  const [coverUploading, setCoverUploading] = useState(false);
  const [images, setImages] = useState([]); // [{url, name, alt}]
  const [libUploading, setLibUploading] = useState(false);

  const contentRef = useRef(null);

  // auth watcher
  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, (u)=>{ setUser(u||null); setCheckingAuth(false); });
    return () => unsub();
  },[]);

  // autoslug din titlu
  const autoSlug = useMemo(()=>slugify(title),[title]);
  useEffect(()=>{ if(!slugTouched) setSlug(autoSlug); },[autoSlug,slugTouched]);

  // draft local (autosave)
  const DRAFT_KEY="admin_post_draft_fs_v2";
  useEffect(()=>{
    try{
      const raw = localStorage.getItem(DRAFT_KEY);
      if(!raw) return;
      const d = JSON.parse(raw);
      setTitle(d.title||"");
      setSlug(d.slug||""); setSlugTouched(Boolean(d.slug));
      setTagsArr(Array.isArray(d.tags)?d.tags:[]);
      setExcerpt(d.excerpt||"");
      setContent(d.content||"");
      setCoverUrl(d.coverUrl||"");
      setImages(Array.isArray(d.images)?d.images:[]);
    }catch{}
  },[]);
  useEffect(()=>{
    const payload={ title, slug, tags:tagsArr, excerpt, content, coverUrl, images };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
  },[title,slug,tagsArr,excerpt,content,coverUrl,images]);

  // tags helpers
  function addTagFromInput(){
    const v = tagInput.trim(); if(!v) return;
    const pieces = v.split(",").map(t=>slugify(t).replace(/-+/g,"-")).filter(Boolean);
    setTagsArr(Array.from(new Set([...tagsArr, ...pieces])).slice(0,12));
    setTagInput("");
  }
  function handleTagKey(e){ if(e.key==="Enter"||e.key===","){ e.preventDefault(); addTagFromInput(); } }
  function removeTag(t){ setTagsArr(tagsArr.filter(x=>x!==t)); }

  // helpers content insert
  function insertAtCursor(text){
    const ta = contentRef.current;
    const start = ta?.selectionStart ?? content.length;
    const end = ta?.selectionEnd ?? content.length;
    const newValue = content.slice(0,start) + text + content.slice(end);
    setContent(newValue);
    requestAnimationFrame(()=>{
      if(!ta) return;
      ta.focus();
      const pos = start + text.length;
      ta.setSelectionRange(pos,pos);
    });
  }

  // STORAGE paths
  const currentSlug = slugify(slug || autoSlug) || `tmp-${Date.now()}`;
  const basePath = `blog/${currentSlug}`;

  async function uploadToStorage(file, keyPrefix="lib"){
    const safeName = file.name.replace(/[^\w\.\-]+/g,"_");
    const r = storageRef(storage, `${basePath}/${keyPrefix}-${Date.now()}-${safeName}`);
    const task = uploadBytesResumable(r, file);
    await new Promise((resolve,reject)=>{
      task.on("state_changed", null, reject, resolve);
    });
    return await getDownloadURL(task.snapshot.ref);
  }

  // Cover upload/replace
  async function handleCoverChoose(e){
    const file = e.target.files?.[0];
    if(!file) return;
    if(!currentSlug){ alert("Completează titlul/slug înainte de upload."); return; }
    try{
      setCoverUploading(true);
      const resized = await resizeImage(file, 1600, 0.9);
      const url = await uploadToStorage(resized, "cover");
      setCoverUrl(url);
    }catch(err){
      console.error(err);
      alert(`Nu am putut încărca cover-ul: ${err?.message || "unknown"}`);
    }finally{
      setCoverUploading(false);
      e.target.value = "";
    }
  }
  async function removeCover(){
    if(!coverUrl) return;
    try{
      const url = new URL(coverUrl);
      const path = decodeURIComponent(url.pathname.split("/o/")[1]).split("?")[0]; // bucket path
      const r = storageRef(storage, path);
      await deleteObject(r);
    }catch(e){
      // dacă nu-l poate șterge (permisiuni), doar ignorăm; îl „decuplăm” din doc
      console.warn("delete cover failed", e?.message);
    }finally{
      setCoverUrl("");
    }
  }

  // Library upload (multiple)
  async function handleLibChoose(e){
    const files = Array.from(e.target.files || []);
    if(!files.length) return;
    try{
      setLibUploading(true);
      const uploaded = [];
      for(const f of files){
        const resized = await resizeImage(f, 1600, 0.9);
        const url = await uploadToStorage(resized, "img");
        uploaded.push({ url, name: f.name, alt: "" });
      }
      setImages(prev => [...uploaded, ...prev].slice(0, 100));
    }catch(err){
      console.error(err);
      alert(`Upload eșuat: ${err?.message || "unknown"}`);
    }finally{
      setLibUploading(false);
      e.target.value = "";
    }
  }
  async function deleteLibImage(img){
    try{
      const url = new URL(img.url);
      const path = decodeURIComponent(url.pathname.split("/o/")[1]).split("?")[0];
      await deleteObject(storageRef(storage, path));
    }catch(e){
      console.warn("delete image failed", e?.message);
    }finally{
      setImages(prev => prev.filter(x => x.url !== img.url));
    }
  }
  function updateAlt(img, alt){
    setImages(prev => prev.map(x => x.url===img.url ? {...x, alt} : x));
  }

  // submit -> Firestore
  async function handleSubmit(e){
    e.preventDefault();
    if(!user){ alert("Trebuie să fii logat."); return; }
    if(!title || !slug || !content){ alert("Titlu, slug și conținut sunt obligatorii."); return; }

    const safeSlug = slugify(slug) || slugify(title);
    try{
      setSaving(true);
      const ref = doc(db, "blogPosts", safeSlug);
      const snap = await getDoc(ref);
      const now = serverTimestamp();

      await setDoc(ref, {
        title,
        slug: safeSlug,
        tags: Array.isArray(tagsArr) ? tagsArr : [],
        excerpt: excerpt || "",
        content,
        cover: coverUrl || null,
        images: images.map(x => ({ url: x.url, alt: x.alt || "", name: x.name || "" })),
        createdAt: snap.exists() ? (snap.data()?.createdAt || now) : now,
        updatedAt: now,
        authorEmail: user.email || null,
        authorUid: user.uid || null,
      }, { merge: true });

      alert(`Post creat: ${safeSlug}`);
      // reset form + draft
      setTitle(""); setSlug(""); setSlugTouched(false);
      setTagsArr([]); setTagInput("");
      setExcerpt(""); setContent("");
      setCoverUrl(""); setImages([]);
      localStorage.removeItem(DRAFT_KEY);
    }catch(err){
      console.error(err);
      alert(`Eroare la salvare: ${err?.message || "unknown"}`);
    }finally{
      setSaving(false);
    }
  }

  async function doLogin(){
    try { await signInWithPopup(auth, googleProvider); }
    catch { await signInWithRedirect(auth, googleProvider); }
  }

  if(checkingAuth){
    return <div className="min-h-screen grid place-items-center bg-black text-white/90">Verific…</div>;
  }

  if(!user){
    return (
      <div className="min-h-screen bg-neutral-950 text-white grid place-items-center p-6">
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-neutral-900 p-6 text-center">
          <h1 className="text-lg font-semibold">Admin login</h1>
          <p className="text-sm text-white/70 mt-1">Autentifică-te cu Google pentru a continua.</p>
          <div className="grid gap-2 mt-4">
            <button onClick={doLogin} className="w-full rounded-xl px-4 py-2 font-semibold bg-white text-black">
              Sign in with Google
            </button>
            <a
              href="/admin/login?key=super-l0ng-cheie-invitat&redirect=/admin/new-post"
              className="text-xs text-white/70 underline"
            >
              Ai link-ul de login ascuns? Intră pe pagina de login
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* mini header */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-neutral-950/70 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <div className="text-sm">
            Logat ca <span className="font-semibold">{user.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              form="postForm"
              type="submit"
              disabled={saving}
              className="rounded-xl px-4 py-2 font-semibold bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Se salvează…" : "Publică"}
            </button>
            <button onClick={()=>signOut(auth)} className="rounded-xl px-3 py-2 border border-white/15">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <form id="postForm" onSubmit={handleSubmit} className="grid gap-6">
          <div className="rounded-2xl border border-white/10 bg-neutral-900 p-5 grid gap-6">
            {/* TITLU / SLUG */}
            <Field label="Titlu" value={title} onChange={setTitle} required placeholder="Ex: 3 pași simpli…" />

            <div className="grid md:grid-cols-2 gap-4">
              <Field
                label="Slug"
                value={slug}
                onChange={(v)=>{ setSlugTouched(true); setSlug(slugify(v)); }}
                placeholder={autoSlug || "se generează din titlu"}
                required
              />
              <div className="text-xs text-white/50 self-end">
                URL final: <code className="text-white/80">/blog/{slug || autoSlug || "slug"}</code>
              </div>
            </div>

            {/* COVER */}
            <div className="grid gap-2">
              <label className="text-sm font-medium">Cover</label>
              {coverUrl ? (
                <div className="relative rounded-xl overflow-hidden border border-white/10">
                  <img src={coverUrl} alt="cover" className="w-full max-h-72 object-cover" />
                  <div className="absolute right-2 top-2 flex gap-2">
                    <label className="px-3 py-1.5 rounded-lg bg-white/90 text-black text-sm cursor-pointer">
                      {coverUploading ? "Încarcă…" : "Schimbă cover"}
                      <input type="file" accept="image/*" className="hidden" onChange={handleCoverChoose} disabled={coverUploading}/>
                    </label>
                    <button type="button" onClick={removeCover} className="px-3 py-1.5 rounded-lg bg-black/60 text-white text-sm">
                      Șterge
                    </button>
                  </div>
                </div>
              ) : (
                <label className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-neutral-800 px-4 py-8 cursor-pointer hover:bg-neutral-700/60">
                  {coverUploading ? "Se încarcă…" : "Alege cover"}
                  <input type="file" accept="image/*" className="hidden" onChange={handleCoverChoose} disabled={coverUploading}/>
                </label>
              )}
              <p className="text-xs text-white/50">Se redimensionează automat (max 1600px).</p>
            </div>

            {/* TAGS */}
            <div className="grid gap-2">
              <label className="text-sm font-medium">Tag-uri</label>
              <div className="flex flex-wrap gap-2">
                {tagsArr.map(t=>(
                  <span key={t} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-neutral-800 border border-white/10 text-xs">
                    {t}
                    <button type="button" onClick={()=>removeTag(t)} className="opacity-70 hover:opacity-100">×</button>
                  </span>
                ))}
                <input
                  value={tagInput}
                  onChange={(e)=>setTagInput(e.target.value)}
                  onKeyDown={handleTagKey}
                  onBlur={addTagFromInput}
                  placeholder="scrie tag și Enter/virgulă"
                  className="min-w-[180px] bg-neutral-800 border border-white/10 rounded-full px-3 py-1 text-xs outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
              <p className="text-xs text-white/50">Maxim ~12 tag-uri.</p>
            </div>

            {/* EXCERPT */}
            <Field
              label="Excerpt"
              value={excerpt}
              onChange={setExcerpt}
              textarea
              rows={3}
              placeholder="Scurt rezumat (apare în listă și SEO description)."
            />

            {/* CONȚINUT */}
            <TextareaWithCount
              label="Conținut"
              value={content}
              onChange={setContent}
              rows={14}
              required
              placeholder="Scrie articolul… (poți lipi textul din editorul tău). Imaginile le inserezi din bibliotecă (Markdown)."
              innerRef={contentRef}
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={()=>{
                setTitle(""); setSlug(""); setSlugTouched(false);
                setTagsArr([]); setTagInput("");
                setExcerpt(""); setContent("");
                setCoverUrl(""); setImages([]);
                localStorage.removeItem(DRAFT_KEY);
              }}
              className="px-4 py-2 rounded-xl border border-white/15 bg-neutral-900 hover:bg-neutral-800"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl px-4 py-2 font-semibold bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Se salvează…" : "Publică"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

/* ---------- mici UI helpers ---------- */
function Field({ label, value, onChange, textarea, rows=4, required, placeholder }){
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium">
        {label} {required && <span className="text-red-400">*</span>}
      </span>
      {textarea ? (
        <textarea
          value={value}
          onChange={e=>onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className="w-full rounded-xl bg-neutral-800 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
        />
      ) : (
        <input
          value={value}
          onChange={e=>onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl bg-neutral-800 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
        />
      )}
    </label>
  );
}
function TextareaWithCount({ label, value, onChange, rows=8, required, placeholder, innerRef }){
  const count = value.trim().length;
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          {label} {required && <span className="text-red-400">*</span>}
        </span>
        <span className="text-xs text-white/60">{count} caractere</span>
      </div>
      <textarea
        ref={innerRef}
        value={value}
        onChange={e=>onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-xl bg-neutral-800 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
      />
    </div>
  );
}

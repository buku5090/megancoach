import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, orderBy, limit, query } from "firebase/firestore";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { isAdmin } from "../admin";
import AdminBar from "../components/AdminBar";
import { useI18n } from "../i18n";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=1600&auto=format&fit=crop";

function toDateString(ts) {
  try {
    const d = ts?.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch { return ""; }
}

function extractFirstImg(html) {
  if (!html) return null;
  const m = String(html).match(/<img[^>]+src=["']([^"']+)["']/i);
  return m?.[1] || null;
}

function getCover(post) {
  return (
    post.cover ||
    post.image ||
    post.imageUrl ||
    (Array.isArray(post.images) && post.images[0]?.url) ||
    extractFirstImg(post.content) ||
    PLACEHOLDER
  );
}

function getCoverAlt(post) {
  return (
    post.coverAlt ||
    (Array.isArray(post.images) && (post.images[0]?.alt || post.images[0]?.name)) ||
    post.title ||
    "cover"
  );
}

function getAuthor(post) {
  return post.author || post.authorName || (post.authorEmail ? post.authorEmail.split("@")[0] : null);
}

function getSlug(post) {
  return post.slug || post.id;
}

export default function BlogList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { t } = useI18n();

  useEffect(() => onAuthStateChanged(auth, (u) => setUser(u || null)), []);

  useEffect(() => {
    (async () => {
      try {
        const q = query(collection(db, "blogPosts"), orderBy("createdAt", "desc"), limit(50));
        const snap = await getDocs(q);
        setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <AdminBar />
      <div className="mx-auto max-w-4xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">{t("blog_title")}</h1>
          {isAdmin(user) && (
            <Link to="/admin/new-post" className="px-3 py-2 rounded-full bg-neutral-900 text-white">
              {t("blog_create_post")}
            </Link>
          )}
        </div>

        {loading && (
          <div className="grid gap-6 lg:grid-cols-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-neutral-200 bg-white overflow-hidden animate-pulse">
                <div className="aspect-[16/9] bg-neutral-100" />
                <div className="p-5 space-y-2">
                  <div className="h-6 w-2/3 bg-neutral-100 rounded" />
                  <div className="h-4 w-4/5 bg-neutral-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !items.length && <div className="text-neutral-600">{t("blog_empty")}</div>}

        <div className="grid gap-6">
          {items.map((p) => {
            const slug = getSlug(p);
            const author = getAuthor(p);
            const cover = getCover(p);
            const alt = getCoverAlt(p);

            return (
              <article
                key={slug}
                className="rounded-2xl border border-neutral-200 bg-white overflow-hidden hover:shadow-md transition"
              >
                {/* cover */}
                <Link to={`/blog/${slug}`} className="block group">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={cover}
                      alt={alt}
                      className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                      loading="lazy"
                      onError={(e) => {
                        if (e.currentTarget.src !== PLACEHOLDER) e.currentTarget.src = PLACEHOLDER;
                      }}
                    />
                  </div>
                </Link>

                {/* content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
                    {p.createdAt && <span>{toDateString(p.createdAt)}</span>}
                    {author && (
                      <>
                        <span>•</span>
                        <span>{author}</span>
                      </>
                    )}
                  </div>

                  <h2 className="text-xl font-semibold text-neutral-900 mb-1">
                    <Link to={`/blog/${slug}`} className="hover:underline">
                      {p.title}
                    </Link>
                  </h2>

                  {p.excerpt && <p className="text-neutral-600 text-sm">{p.excerpt}</p>}

                  {!!p.tags?.length && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

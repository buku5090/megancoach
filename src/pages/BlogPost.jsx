// src/pages/BlogPost.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, collection, query, where, limit, getDocs } from "firebase/firestore";
import Page from "../components/Page";
import { useI18n } from "../i18n";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=1600&auto=format&fit=crop";

function toDateString(ts) {
  try {
    const d = ts?.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return "";
  }
}
function readingTime(text) {
  const words = String(text || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200)); // ~200 wpm
}
function extractFirstImg(html) {
  if (!html) return null;
  const m = String(html).match(/<img[^>]+src=["']([^"']+)["']/i);
  return m?.[1] || null;
}
function getCover(post) {
  return (
    post.cover ||
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

export default function BlogPost() {
  const { slug } = useParams();
  const { t } = useI18n();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch by document id (slug). if not found, try query by field 'slug'
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const byId = await getDoc(doc(db, "blogPosts", slug));
        if (!cancelled && byId.exists()) {
          setPost({ id: byId.id, ...byId.data() });
          return;
        }
        const q = query(collection(db, "blogPosts"), where("slug", "==", slug), limit(1));
        const snap = await getDocs(q);
        if (!cancelled && snap.docs[0]) {
          setPost({ id: snap.docs[0].id, ...snap.docs[0].data() });
        } else if (!cancelled) {
          setPost(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const minutes = useMemo(() => readingTime(post?.content || ""), [post]);

  if (loading) {
    return (
      <Page>
        <article className="max-w-3xl mx-auto p-4">
          <div className="h-8 w-2/3 bg-neutral-100 rounded mb-4 animate-pulse" />
          <div className="aspect-[16/9] bg-neutral-100 rounded-xl mb-6 animate-pulse" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-neutral-100 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-neutral-100 rounded animate-pulse" />
            <div className="h-4 w-4/6 bg-neutral-100 rounded animate-pulse" />
          </div>
        </article>
      </Page>
    );
  }

  if (!post) {
    return (
      <Page title={t("blog_not_found")}>
        <div className="max-w-3xl mx-auto p-4">
          <p className="text-neutral-600">{t("blog_not_found")}</p>
          <Link to="/blog" className="inline-block mt-4 rounded-full border px-4 py-2 hover:bg-neutral-50">
            ← {t("blog_back")}
          </Link>
        </div>
      </Page>
    );
  }

  const cover = getCover(post);
  const alt = getCoverAlt(post);
  const author = getAuthor(post);

  return (
    <Page title={post.title}>
      <article className="max-w-3xl mx-auto p-4">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">{post.title}</h1>

        {/* Meta */}
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
          {post.createdAt && <span>{toDateString(post.createdAt)}</span>}
          <span>•</span>
          <span>{minutes} {t("blog_min")}</span>
          {author && (
            <>
              <span>•</span>
              <span>{author}</span>
            </>
          )}
        </div>

        {/* Cover */}
        <div className="mt-6 rounded-xl overflow-hidden">
          <img
            src={cover}
            alt={alt}
            className="w-full h-auto object-cover"
            onError={(e) => {
              if (e.currentTarget.src !== PLACEHOLDER) e.currentTarget.src = PLACEHOLDER;
            }}
          />
        </div>

        {/* Excerpt */}
        {post.excerpt && <p className="mt-4 text-neutral-600">{post.excerpt}</p>}

        {/* Content */}
        <div className="prose prose-neutral max-w-none mt-6">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: (props) => (
                // imaginile din conținut primesc styling consistent
                <img {...props} className="rounded-xl border border-neutral-200" loading="lazy" />
              ),
              a: (props) => <a {...props} target="_blank" rel="noopener noreferrer" />,
            }}
          >
            {post.content || ""}
          </ReactMarkdown>
        </div>

        {/* Tags */}
        {!!post.tags?.length && (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Back link */}
        <div className="mt-10">
          <Link to="/blog" className="inline-block rounded-full border px-4 py-2 hover:bg-neutral-50">
            ← {t("blog_back")}
          </Link>
        </div>
      </article>
    </Page>
  );
}

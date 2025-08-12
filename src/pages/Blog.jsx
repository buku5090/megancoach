import Page from "../components/Page";
import { Link } from "react-router-dom";

const posts = [
  { slug:"ce-este-somatic", title:"Ce este coachingul somatic?", date:"2025-08-01" },
  { slug:"respiratie-ancorata", title:"Respirație ancorată 101", date:"2025-08-05" },
];

export default function Blog() {
  return (
    <Page title="Blog">
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map(p=>(
          <Link key={p.slug} to={`/blog/${p.slug}`} className="p-5 border rounded-xl bg-white hover:shadow-sm">
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{p.date}</p>
            <div className="aspect-[16/9] bg-gray-200 rounded mt-4" />
            <p className="text-gray-600 mt-3">Excerpt placeholder…</p>
          </Link>
        ))}
      </div>
    </Page>
  );
}

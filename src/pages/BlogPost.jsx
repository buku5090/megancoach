import Page from "../components/Page";
import { useParams } from "react-router-dom";

export default function BlogPost() {
  const { slug } = useParams();
  return (
    <Page>
      <article className="prose max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold capitalize">{slug?.replaceAll("-", " ")}</h1>
        <div className="aspect-[16/9] bg-gray-200 rounded my-6" />
        <p>Conținut placeholder pentru articolul „{slug}”.</p>
      </article>
    </Page>
  );
}

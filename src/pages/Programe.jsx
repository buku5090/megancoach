import Page from "../components/Page";
import SectionHeading from "../components/SectionHeading";
import { Card } from "../components/Card";
import { Link } from "react-router-dom";

const items = [
  { slug:"individuals", title:"Individuals", desc:"1:1 somatic coaching." },
  { slug:"couples", title:"Couples", desc:"Conectare & comunicare conștientă." },
  { slug:"groups", title:"Groups", desc:"Cercuri, workshop-uri ghidate." },
];

export default function Programe() {
  return (
    <Page title="Programe">
      <SectionHeading sub="Alege formatul potrivit ție.">Work with me</SectionHeading>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map(i => (
          <Link key={i.slug} to={`/work-with-me/${i.slug}`} className="block">
            <Card title={i.title} desc={i.desc} />
          </Link>
        ))}
      </div>
      <p className="mt-8 text-sm text-gray-600">Nu știi ce să alegi? <a className="underline" href="/programeaza-sesiuni">Programează un call</a>.</p>
    </Page>
  );
}

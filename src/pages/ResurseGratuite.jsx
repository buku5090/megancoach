import Page from "../components/Page";
import { Card } from "../components/Card";

const resources = [
  { title:"3-Day Reset (mini-curs)", desc:"Email series – practici somatice." },
  { title:"Ghid PDF: Respirație ancorată", desc:"Tehnici simple pentru sistemul nervos." },
  { title:"Audio: Body Scan (10 min)", desc:"Reconectare blândă la corp." },
];

export default function ResurseGratuite() {
  return (
    <Page title="Resurse gratuite">
      <div className="grid md:grid-cols-3 gap-6">
        {resources.map((r,i)=><Card key={i} title={r.title} desc={r.desc} />)}
      </div>
    </Page>
  );
}

import Page from "../components/Page";

const links = [
  { name:"Canva", url:"https://www.canva.com" },
  { name:"Google Forms", url:"https://forms.google.com" },
  { name:"Notion", url:"https://www.notion.so" },
];

export default function StarterResurse() {
  return (
    <Page title="Site-uri gratuite & formulare">
      <ul className="list-disc pl-6 space-y-2">
        {links.map(l => (
          <li key={l.url}>
            <a className="underline" href={l.url} target="_blank" rel="noreferrer">{l.name}</a>
          </li>
        ))}
      </ul>
    </Page>
  );
}

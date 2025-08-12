import Page from "../components/Page";
import SectionHeading from "../components/SectionHeading";

const events = [
  { title:"Somatic Circle – April 20", desc:"2h, offline/online, nivel începător." },
  { title:"Retreat de weekend", desc:"Lucru profund, ritualuri blânde." },
];

export default function Evenimente() {
  return (
    <Page title="Evenimente">
      <SectionHeading sub="Workshop-uri, cercuri, retreat-uri">Calendar</SectionHeading>
      <ul className="space-y-4">
        {events.map((e,i)=>(
          <li key={i} className="p-5 border rounded-xl bg-white">
            <h3 className="font-semibold">{e.title}</h3>
            <p className="text-gray-600">{e.desc}</p>
          </li>
        ))}
      </ul>
    </Page>
  );
}

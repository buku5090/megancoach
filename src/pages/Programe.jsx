// Programe.jsx
import Page from "../components/Page";
import SectionHeading from "../components/SectionHeading";
import { Card } from "../components/Card";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n";

// doar slugs aici; textele vin din t()
const items = ["individuals", "couples", "groups"];

// slug -> target routes (JSX/JS, fără tipuri)
const pathMap = {
  individuals: "/programeaza-sesiuni",
  couples: "/contact",
  groups: "/contact",
};

// slug -> image (Pexels, free for commercial use)
const imageMap = {
  individuals:
    "https://images.pexels.com/photos/7699526/pexels-photo-7699526.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&fit=crop",
  couples:
    "https://images.pexels.com/photos/7176182/pexels-photo-7176182.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&fit=crop",
  groups:
    "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&fit=crop",
};

export default function Programe() {
  const { t } = useI18n();

  return (
    <Page title={t("programs_page_title")}>
      <SectionHeading sub={t("programs_sub")}>
        {t("programs_h1")}
      </SectionHeading>

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((slug) => (
          <Link key={slug} to={pathMap[slug]} className="block">
            <Card
              title={t(`programs_${slug}_title`)}
              desc={t(`programs_${slug}_desc`)}
              imageSrc={imageMap[slug]}
              imageAlt={t(`programs_${slug}_title`)}
            />
          </Link>
        ))}
      </div>
    </Page>
  );
}

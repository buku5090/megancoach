import Container from "./Container";
import { useI18n } from "../i18n";

export default function Reasons() {
  const { t } = useI18n();
  const items = [
    t("reasons_item_1"),
    t("reasons_item_2"),
    t("reasons_item_3"),
    t("reasons_item_4"),
    t("reasons_item_5"),
  ];

  return (
    <section>
      <Container className="py-16">
        <h3 className="text-2xl font-semibold">
          {t("reasons_title")}
        </h3>
        <ul className="mt-6 grid md:grid-cols-2 gap-4 text-gray-700">
          {items.map((txt, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-black" />
              <span>{txt}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

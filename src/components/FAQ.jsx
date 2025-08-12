import { useState } from "react";
export function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b">
      <button onClick={() => setOpen(!open)} className="w-full py-4 text-left font-medium flex justify-between">
        {q} <span>{open ? "−" : "+"}</span>
      </button>
      {open && <p className="pb-4 text-gray-700">{a}</p>}
    </div>
  );
}
export function FAQList({ items }) {
  return <div className="rounded-xl border bg-white">{items.map((it, i)=><FAQItem key={i} {...it}/>)}</div>;
}

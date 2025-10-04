// BookingEmbed.tsx
export default function BookingEmbed() {
  const url =
    "https://calendly.com/paulaghcoach/30min?hide_gdpr_banner=1&embed_domain=localhost:3000&embed_type=Inline";
  return (
    <div className="rounded-xl border bg-white p-2">
      <iframe
        title="Programare sesiune"
        src={url}
        className="w-full h-[760px] rounded"
        frameBorder="0"
      />
    </div>
  );
}

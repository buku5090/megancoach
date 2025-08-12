export default function BookingEmbed() {
  return (
    <div className="rounded-xl border bg-white p-2">
      {/* Înlocuiește src cu link-ul tău Calendly */}
      <iframe
        title="Booking"
        src="https://calendly.com/"
        className="w-full h-[700px] rounded"
      />
    </div>
  );
}

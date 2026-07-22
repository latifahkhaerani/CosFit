import EventForm from "@/components/admin/EventForm";
import OurEventModel from "@/db/models/ourEventModel";
import serializeEvent from "@/app/helpers/serializeEvent";

export const metadata = {
  title: "Edit Event | Admin",
};

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch data berdasarkan ID
  const rawData = await OurEventModel.getEventById(id);

  if (!rawData) {
    return (
      <div className="p-8 text-center text-slate-400">
        <h1>Event tidak ditemukan.</h1>
      </div>
    );
  }

  // Format data menggunakan fungsi serialize milik Anda (untuk mengubah ObjectId menjadi string, dll)
  const event = serializeEvent(rawData);

  // Map ke struktur GetEvent
  const mappedEvent = {
    ...event,
    _id: String(event._id),
    title: event.eventName ?? event.title ?? "",
    coverImage: event.imgUrl ?? event.coverImage ?? "",
    eventType:
      event.eventType ??
      (event.category?.toLowerCase().includes("contest")
        ? "internal_contest"
        : "external_convention"),
  };

  return (
    <section className="mx-auto max-w-5xl space-y-6">
      <EventForm initialData={mappedEvent} />
    </section>
  );
}

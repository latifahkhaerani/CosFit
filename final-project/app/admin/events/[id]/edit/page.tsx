import EventForm from "@/components/admin/EventForm";
import OurEventModel from "@/db/models/ourEventModel";
import serializeEvent from "@/app/helpers/serializeEvent";
import type { GetEvent } from "@/app/types";

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
        <h1>Event not found.</h1>
      </div>
    );
  }

  // Format data menggunakan fungsi serialize milik Anda (untuk mengubah ObjectId menjadi string, dll)
  const event = serializeEvent(rawData);

  const mappedEvent: GetEvent = {
    ...event,
    _id: String(event._id),
    title: event.eventName ?? "",
    description: event.description ?? "",
    category: event.category ?? "",
    coverImage: event.imgUrl ?? "",
    startDate: event.startDate ?? "",
    endDate: event.endDate,
    locationName: event.locationName,
    address: event.address,
    externalLink: event.externalLink,
    eventType:
      event.eventType ??
      (event.category?.toLowerCase().includes("contest")
        ? "internal_contest"
        : "external_convention"),
    entries: event.entries,
    maxEntries: event.maxEntries,
    status: event.status,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
  };

  return (
    <section className="mx-auto max-w-5xl space-y-6">
      <EventForm initialData={mappedEvent} />
    </section>
  );
}

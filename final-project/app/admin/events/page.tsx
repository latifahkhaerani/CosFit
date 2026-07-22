import EventTable from "@/components/admin/EventTable";
import { GetEvent } from "@/app/types";
import Link from "next/link";
import { Plus } from "lucide-react"; // Pastikan lucide-react terinstall

export const revalidate = 0;

async function getEvents(): Promise<GetEvent[]> {
  const res = await fetch("http://localhost:3000/api/admin/events", {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const raw = await res.json();

  // Map ourEvents shape to GetEvent shape expected by admin UI
  return raw.map((doc: any) => ({
    _id: String(doc._id),
    title: doc.eventName ?? doc.title ?? "",
    description: doc.description ?? "",
    coverImage: doc.imgUrl ?? doc.coverImage,
    category: doc.category ?? "",
    forumId: doc.forumId ?? "",
    startDate: doc.startDate ?? new Date().toISOString(),
    endDate: doc.endDate,
    locationName: doc.locationName,
    address: doc.address,
    externalLink: doc.externalLink,
    eventType: doc.eventType
      ? doc.eventType
      : (doc.category || "").toLowerCase().includes("contest")
        ? "internal_contest"
        : "external_convention",
    entries: doc.entries || [],
    status: doc.status || "upcoming",
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }));
}

export default async function AdminEventsPage() {
  const events = await getEvents();

  return (
    <section className="space-y-6">
      {/* Header Section */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">
              Manajemen Event
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-50">
              Daftar Event
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden rounded-full border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-slate-300 sm:inline-block">
              Total: {events.length} event
            </span>
            {/* Tombol Create New Event */}
            <Link
              href="/admin/events/create"
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-secondary"
            >
              <Plus className="h-4 w-4" />
              Create Event
            </Link>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
        <EventTable events={events} />
      </div>
    </section>
  );
}

import type { GetOurEvent } from "@/app/types";

export default function AdminHomeEvents({ events }: { events: GetOurEvent[] }) {
  if (!events || events.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
        <p className="text-slate-400">No events yet.</p>
      </div>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="card-title">Event Terdekat</h2>
        <a href="/admin/events" className="text-sm text-slate-400 hover:underline">Lihat semua</a>
      </div>

      <div className="space-y-3">
        {events.map((ev) => (
          <div key={ev._id} className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-3">
            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-slate-800">
              {ev.imgUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={ev.imgUrl} alt={ev.eventName} className="h-full w-full object-cover" />
              ) : null}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-50">{ev.eventName}</h3>
                  <p className="text-sm text-slate-400">{ev.startDate ? new Date(ev.startDate).toLocaleDateString() : ""}</p>
                </div>

                <div className="flex gap-2">
                  <span className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-300">{ev.category || ""}</span>
                  <span className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-300">{ev.category && ev.category.toLowerCase().includes("contest") ? "Kontes Admin" : "Convention"}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import type { GetOurEvent } from "@/app/types";
import Link from "next/link";

export default function AdminHomeEvents({ events }: { events: GetOurEvent[] }) {
  if (!events || events.length === 0) {
    return (
      <div className="rounded-3xl border border-border bg-[#FCFBFA] p-6 shadow-card">
        <p className="text-muted">No events yet.</p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[var(--text)]">
          Event Terdekat
        </h2>
        <Link
          href="/admin/events"
          className="text-sm font-medium text-primary hover:underline"
        >
          Lihat semua
        </Link>
      </div>

      <div className="space-y-3">
        {events.map((ev) => (
          <div
            key={ev._id}
            className="flex items-center gap-4 rounded-[24px] border border-[var(--border)] bg-[#FCFBFA] p-4 shadow-card"
          >
            <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-2xl bg-white">
              {ev.imgUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={ev.imgUrl}
                  alt={ev.eventName}
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>

            <div className="flex-1">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text)]">
                    {ev.eventName}
                  </h3>
                  <p className="text-sm text-muted">
                    {ev.startDate
                      ? new Date(ev.startDate).toLocaleDateString()
                      : ""}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[var(--text)]">
                    {ev.category || ""}
                  </span>
                  <span className="rounded-full bg-[#FFF5F0] px-3 py-1 text-xs font-medium text-primary">
                    {ev.category &&
                    ev.category.toLowerCase().includes("contest")
                      ? "Kontes Admin"
                      : "Convention"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

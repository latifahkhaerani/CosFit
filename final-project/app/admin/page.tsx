import AdminHomeEvents from "@/components/admin/AdminHomeEvents";
import OurEventModel from "@/db/models/ourEventModel";
import UserModel from "@/db/models/userModel";
import serializeEvent from "@/app/helpers/serializeEvent";

export default async function AdminHomePage() {
  // Fetch events
  const docs = await OurEventModel.getAllEvents();
  const events = docs.map(serializeEvent);

  // Sort by startDate ascending (closest first)
  events.sort((a, b) => {
    const da = a.startDate ? new Date(a.startDate).getTime() : Infinity;
    const db = b.startDate ? new Date(b.startDate).getTime() : Infinity;
    return da - db;
  });

  const totalEvents = events.length;
  const now = Date.now();

  // Filter untuk menghitung kontes aktif (Menggunakan eventType yang sudah disepakati)
  const contestsActive = events.filter((ev) => {
    if (ev.eventType !== "internal_contest") return false;

    const start = ev.startDate ? new Date(ev.startDate).getTime() : null;
    const end = ev.endDate ? new Date(ev.endDate).getTime() : null;

    if (!start) return false;
    if (end) return start <= now && now <= end;
    return start <= now; // ongoing if started and no endDate
  }).length;

  // Fetch total users
  const userCount = await UserModel.collection().countDocuments();

  return (
    <section className="space-y-6">
      {/* Header Halaman */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 md:p-8 shadow-sm">
        <p className="text-sm font-medium text-slate-400">
          Welcome back, Admin
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-50">
          Dashboard Overview
        </h1>
        <p className="mt-2 text-slate-400">
          Review event performance, manage contests, and moderate entries.
        </p>
      </div>

      {/* Kotak Statistik (Grid 3 Kolom) */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Total Event
          </p>
          <p className="mt-3 text-4xl font-semibold text-slate-50">
            {totalEvents}
          </p>
          <p className="mt-1 text-sm text-slate-500">Kontes & Convention</p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Kontes Aktif
          </p>
          <p className="mt-3 text-4xl font-semibold text-primary">
            {contestsActive}
          </p>
          <p className="mt-1 text-sm text-slate-500">Sedang berlangsung</p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Total Pengguna
          </p>
          <p className="mt-3 text-4xl font-semibold text-slate-50">
            {userCount}
          </p>
          <p className="mt-1 text-sm text-slate-500">User terdaftar</p>
        </div>
      </div>

      {/* Tabel/Daftar Event */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-slate-50">
          Recent Events
        </h2>
        <AdminHomeEvents events={events} />
      </div>
    </section>
  );
}

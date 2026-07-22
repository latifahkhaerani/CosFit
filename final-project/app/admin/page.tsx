import AdminHomeEvents from "@/components/admin/AdminHomeEvents";
import OurEventModel from "@/db/models/ourEventModel";
import UserModel from "@/db/models/userModel";
import serializeEvent from "@/app/helpers/serializeEvent";
import VendorStatCard from "@/components/vendor/VendorStatCard";
import { CalendarDays, CircleCheck, Users, Trophy } from "lucide-react";

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

  const contestsActive = events.filter(
    (ev) => ev.eventType === "internal_contest" && ev.status === "active",
  ).length;

  // Fetch total users
  const userCount = await UserModel.collection().countDocuments();

  return (
    <section className="space-y-8">
      <div className="card mb-8 flex items-center justify-between p-8">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-muted">
            Welcome back, Admin
          </p>
          <h1 className="mt-3 text-5xl font-bold leading-tight text-[var(--text)]">
            Dashboard Overview
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted">
            Review event performance, manage contests, and monitor the platform
            health from one place.
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <VendorStatCard
          title="Total Event"
          value={totalEvents}
          growth="All active event records"
          icon="calendar"
          color="#B14744"
        />

        <VendorStatCard
          title="Kontes Aktif"
          value={contestsActive}
          growth="Currently in progress"
          icon="trophy"
          color="#CC8857"
        />

        <VendorStatCard
          title="Total Pengguna"
          value={userCount}
          growth="Registered users"
          icon="users"
          color="#16A34A"
        />
      </div>

      <div className="card p-7">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="card-title">Recent Events</h2>
            <p className="card-subtitle">
              Latest event updates and moderation queue
            </p>
          </div>
        </div>
        <AdminHomeEvents events={events} />
      </div>
    </section>
  );
}

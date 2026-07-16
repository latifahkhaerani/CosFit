import QuickAction from "@/components/vendor/QuickAction";
import RecentRentalCard from "@/components/vendor/RecentRentalCard";
import UpcomingEventCard from "@/components/vendor/UpcomingEventCard";
import VendorSidebar from "@/components/vendor/VendorSidebar";
// import VendorSidebar from "@/components/vendor/VendorSidebar";

import VendorStatCard from "@/components/vendor/VendorStatCard";
import {
  Shirt,
  ShoppingBag,
  Hourglass,
  CircleCheck,
  Bell,
  Search,
  Plus,
} from "lucide-react";
import { CalendarDays, MessageSquare } from "lucide-react";

export default function VendorDashboard() {
  return (
    <main className="flex min-h-screen bg-(--background)">
      <VendorSidebar />

      <section className="flex-1 p-8">
        {/* Top */}

        <div className="mb-8 flex items-center justify-between">
          <div className="relative w-130">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              placeholder="Search costumes..."
              className="input-soft h-14 w-full pl-14"
            />
          </div>

          <div className="flex items-center gap-5">
            <Bell />

            <button className="primary-btn flex items-center gap-2">
              <Plus size={18} />
              Add Costume
            </button>
          </div>
        </div>

        {/* Hero */}

        <div className="card mb-8 flex items-center justify-between p-8">
          <div>
            <h1 className="text-5xl font-bold">
              Welcome Back,
              <span className="text-(--primary)"> Starlight Cosplay</span>
              👋
            </h1>

            <p className="mt-3 text-lg text-(--muted)">
              Manage your cosplay rental business with CosFit.
            </p>
          </div>
        </div>

        {/* Statistics */}

        <div className="grid gap-6 lg:grid-cols-4">
          <VendorStatCard
            title="Total Costumes"
            value={28}
            growth="+12% from last month"
            icon={Shirt}
            color="#6B5BDB"
          />

          <VendorStatCard
            title="Active Rentals"
            value={14}
            growth="+8% from last month"
            icon={ShoppingBag}
            color="#F59E0B"
          />

          <VendorStatCard
            title="Pending Requests"
            value={7}
            growth="+40% from last month"
            icon={Hourglass}
            color="#EF4444"
          />

          <VendorStatCard
            title="Completed Rentals"
            value={56}
            growth="+15% from last month"
            icon={CircleCheck}
            color="#16A34A"
          />
        </div>

        <div className="mt-8 grid grid-cols-12 gap-6">
          {/* LEFT */}

          <div className="col-span-8 space-y-6">
            {/* Quick Actions */}

            <div className="card p-6">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="card-title">Quick Actions</h3>
              </div>

              <div className="grid grid-cols-4 gap-5">
                <QuickAction
                  title="Add Costume"
                  desc="Upload a new costume"
                  color="#EF4444"
                  icon={<Plus size={22} />}
                />

                <QuickAction
                  title="Manage Orders"
                  desc="View rental requests"
                  color="#F59E0B"
                  icon={<ShoppingBag size={22} />}
                />

                <QuickAction
                  title="Upcoming Events"
                  desc="Join cosplay events"
                  color="#6B5BDB"
                  icon={<CalendarDays size={22} />}
                />

                <QuickAction
                  title="Community"
                  desc="Connect vendors"
                  color="#16A34A"
                  icon={<MessageSquare size={22} />}
                />
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="col-span-4 space-y-6">
            <RecentRentalCard />

            <UpcomingEventCard />
          </div>
        </div>
      </section>
    </main>
  );
}

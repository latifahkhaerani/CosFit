"use client";
import RecentRentalCard from "@/components/vendor/RecentRentalCard";
import UpcomingEventCard from "@/components/vendor/UpcomingEventCard";
import VendorProductRow from "@/components/vendor/VendorProductRow";
import VendorSidebar from "@/components/vendor/VendorSidebar";
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
import { useEffect, useState } from "react";
import { GetProduct, GetVendor } from "../types";
import Link from "next/link";

export default function VendorDashboard() {

  const [vendor, setVendor] = useState<GetVendor>()
  const [vendorProd, setVendorProd] = useState<GetProduct>()

  useEffect(() => {
    const fetching = async () => {
      const response = await fetch("http://localhost:3000/api/vendor/profile");
      const dataVendor: GetVendor = await response.json();
      setVendor(dataVendor)
    }

    fetching()
  }, [])
  

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

    <div className="relative w-[520px]">

    <Search
        size={20}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
    />

    <input
        className="h-14 w-full rounded-2xl border border-[var(--border)] bg-white pl-14 pr-5 shadow-card outline-none focus:border-[var(--primary)]"
    />

</div>
          </div>

          <div className="flex items-center gap-5">
            <Bell />

            <Link href={"/vendor/create-prod"}>
              <button className="primary-btn flex items-center gap-2">
                <Plus size={18} />
                Add Costume
              </button>
            </Link>
          </div>
        </div>

        {/* Hero */}

        <div className="card mb-8 flex items-center justify-between p-8">
          <div>
            <h1 className="text-5xl font-bold">
              Welcome Back,
              <span className="text-(--primary)">{vendor?.namaToko}</span>
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

            <div className="card p-7">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="card-title">My Costumes</h3>

                <button className="secondary-btn">View All Costumes</button>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-(--muted)">
                    <th className="pb-4">Costume</th>

                    <th>Rental Price</th>

                    <th>Availability</th>

                    <th>Rental</th>

                    <th>Views</th>

                    <th>Wishlist</th>

                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  <VendorProductRow
                    image="/images/raiden.jpg"
                    character="Raiden Shogun"
                    series="Genshin Impact"
                    price={350000}
                    availability="Available"
                    rental="Rented"
                    views={1200}
                    wishlist={234}
                  />

                  <VendorProductRow
                    image="/images/saber.jpg"
                    character="Saber"
                    series="Fate"
                    price={300000}
                    availability="Available"
                    rental="Available"
                    views={980}
                    wishlist={198}
                  />

                  <VendorProductRow
                    image="/images/zerotwo.jpg"
                    character="Zero Two"
                    series="Darling in the Franxx"
                    price={280000}
                    availability="Low Stock"
                    rental="Available"
                    views={760}
                    wishlist={145}
                  />

                  <VendorProductRow
                    image="/images/levi.jpg"
                    character="Levi Ackerman"
                    series="Attack on Titan"
                    price={250000}
                    availability="Out of Stock"
                    rental="Available"
                    views={620}
                    wishlist={102}
                  />
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT */}

          <div className="col-span-4 space-y-6">
            <RecentRentalCard />

            <UpcomingEventCard />

            <div className="card card-hover p-7">
              <div className="mb-5">
                <h3 className="card-title">Level Up Your Store</h3>

                <p className="card-subtitle">
                  Complete your profile and increase visibility.
                </p>
              </div>

              <div className="my-8 flex justify-center">
                <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[10px] border-[#F6D5BE]">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold">85%</h2>

                    <p className="text-sm text-[var(--muted)]">Completed</p>
                  </div>
                </div>
              </div>

              <button className="primary-btn w-full">Complete Profile</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

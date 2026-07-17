'use client'

import Image from "next/image";
import {
  Home,
  User,
  Heart,
  Calendar,
  Clock3,
  Star,
  Settings,
  Crown,
  Pencil,
  Sparkles,
  
} from "lucide-react";
import { CheckCircle2, Circle, LogOut } from "lucide-react";
import SidebarItem from "@/components/profile/sidebarButton";
import { GetUserProfile } from "../types";
import { useEffect, useState } from "react";
import errorHandler from "../helpers/errorHandler";

export default function ProfilePage() {

  const [profile, setProfile] = useState<GetUserProfile>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("http://localhost:3000/api/user/profile")
        const userProfile: GetUserProfile = await data.json()

        setProfile(userProfile)
      } catch (error) {
        errorHandler(error)
      }
    }

    fetchData()
  }, [])


  const savedLooks = [
    {
      id: 1,
      character: "Hu Tao",
      series: "Genshin Impact",
      image: "/images/hutao-card.jpg",
    },
    {
      id: 2,
      character: "Rem",
      series: "Re:Zero",
      image: "/images/rem.jpg",
    },
    {
      id: 3,
      character: "2B",
      series: "NieR",
      image: "/images/2b.jpg",
    },
    {
      id: 4,
      character: "Saber",
      series: "Fate",
      image: "/images/saber.jpg",
    },
  ];

  const wishlistItems = [
    {
      id: 1,
      character: "Raiden Shogun",
      series: "Genshin Impact",
      image: "/images/raiden.jpg",
      price: 450000,
    },
    {
      id: 2,
      character: "Zero Two",
      series: "Darling in the Franxx",
      image: "/images/zerotwo.jpg",
      price: 400000,
    },
    {
      id: 3,
      character: "Makima",
      series: "Chainsaw Man",
      image: "/images/makima.jpg",
      price: 500000,
    },
  ];

  const rentals = [
    {
      id: 1,
      character: "Hu Tao",
      series: "Genshin Impact",
      image: "/images/hutao-card.jpg",
      status: "Completed",
      rating: 5,
      date: "12 Jun 2026",
    },
    {
      id: 2,
      character: "Rem",
      series: "Re:Zero",
      image: "/images/rem.jpg",
      status: "Returned",
      rating: 4,
      date: "20 May 2026",
    },
    {
      id: 3,
      character: "Zero Two",
      series: "Darling in the Franxx",
      image: "/images/zerotwo.jpg",
      status: "On Going",
      rating: 0,
      date: "26 Jul 2026",
    },
  ];

  const events = [
    {
      id: 1,
      title: "Comic Frontier",
      month: "AUG",
      day: "12",
      location: "ICE BSD",
      time: "09:00 AM",
    },
    {
      id: 2,
      title: "Ennichisai Festival",
      month: "SEP",
      day: "05",
      location: "Blok M",
      time: "10:00 AM",
    },
  ];

  const characters = [
    {
      id: 1,
      name: "Hu Tao",
      series: "Genshin",
      image: "/images/hutao-avatar.jpg",
    },
    {
      id: 2,
      name: "Rem",
      series: "Re:Zero",
      image: "/images/rem-avatar.jpg",
    },
    {
      id: 3,
      name: "Makima",
      series: "Chainsaw",
      image: "/images/makima-avatar.jpg",
    },
  ];

  const newLocal =
    "rounded-2xl bg-gradient-to-r from-[#FFF4EE] to-[#FFFDFB] p-8";

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-362.5 px-6 py-8">
        <div className="grid gap-6 xl:grid-cols-[260px_1fr]">
          {/* ================= SIDEBAR ================= */}

          <aside className="space-y-5">
            {/* Profile */}

            <div className="card p-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-[#F7D8C4]">
                    <Image
                      src={profile? profile.photo : ""}
                      alt="avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <h2 className="mt-6 text-2xl font-bold">{profile? profile.userId[0].username : "username"}</h2>

                <p className="text-muted">@yunacos</p>
              </div>

              {/* XP */}

              {/* <div className="mt-8">
                <div className="mb-2 flex justify-between text-sm">
                  <span>Level 12</span>

                  <span className="text-muted">2450 / 5000 XP</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-[#EFEAE4]">
                  <div className="h-full w-1/2 rounded-full bg-primary" />
                </div>
              </div> */}
            </div>

            {/* Menu */}

            <div className="card p-3">
              <SidebarItem active icon={<Home size={18} />} title={"Overview"} />

              <SidebarItem icon={<User size={18} />} title={"Body Profile"} />

              <SidebarItem icon={<Sparkles size={18} />} title={"Saved Looks"} />

              <SidebarItem icon={<Heart size={18} />} title="Wishlist" />

              <SidebarItem icon={<Clock3 size={18} />} title="Rental History" />

              <SidebarItem
                icon={<Calendar size={18} />}
                title="Upcoming Events"
              />

              <SidebarItem
                icon={<Star size={18} />}
                title="Favorite Characters"
              />

              <SidebarItem icon={<Settings size={18} />} title="Settings" />

              <SidebarItem icon={<LogOut size={18} />} title="Logout" />

            </div>

            {/* Premium */}

            <div className="overflow-hidden rounded-2xl bg-linear-to-br from-[#FFF4EE] to-[#FFFDFB] p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                  <Crown className="text-primary" />
                </div>

                <div>
                  <h3 className="font-semibold">CosFit Premium</h3>

                  <p className="text-sm text-muted">
                    Unlock exclusive AI features
                  </p>
                </div>
              </div>

              <button className="mt-5 h-11 w-full rounded-xl bg-primary font-medium text-white">
                Upgrade Now
              </button>
            </div>
          </aside>

          {/* ================= CONTENT ================= */}

          <section className="space-y-6">
            {/* Welcome */}

            <div className="card flex items-center justify-between rounded-2xl border p-6 shadow-sm">
              <div>
                <h1 className="flex items-center gap-2 text-3xl font-bold">
                  Welcome back, {profile? profile.userId[0].username : "You"}
                  <Sparkles size={20} className="text-accent" />
                </h1>

                <p className="mt-2 text-muted">
                  Ready to find your next perfect cosplay?
                </p>
              </div>

              <button className="flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-white transition hover:opacity-90">
                <Pencil size={16} />
                Edit Profile
              </button>
            </div>

            {/* Content Grid */}

            <div className="grid gap-5 xl:grid-cols-[1.2fr_1.3fr_1fr]">
              {/* BODY PROFILE */}

              <div className="card p-5">
                {/* Header */}

                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-text">
                      Body Profile
                    </h3>

                    <p className="mt-1 text-sm text-muted">
                      Used for AI size matching
                    </p>
                  </div>

                  <button className="text-sm font-medium text-primary hover:underline">
                    View Details →
                  </button>
                </div>

                {/* Content */}

                <div className="grid gap-5 lg:grid-cols-[160px_1fr]">
                  {/* Image */}

                  <div className="relative aspect-2/4 overflow-hidden rounded-2xl">
                    <Image
                      src="/images/user-body.png"
                      alt="Body"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Right */}

                  <div className="space-y-4">
                    {/* Height Weight */}

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-[#FCFBFA] p-4">
                        <p className="text-sm text-muted">Height</p>

                        <h3 className="mt-2 text-2xl font-bold">155 cm</h3>
                      </div>

                      <div className="rounded-xl bg-[#FCFBFA] p-4">
                        <p className="text-sm text-muted">Weight</p>

                        <h3 className="mt-2 text-2xl font-bold">45 kg</h3>
                      </div>
                    </div>

                    {/* Measurement */}

                    <div className="card rounded-xl p-4">
                      <h4 className="mb-4 font-semibold">Measurements</h4>

                      <div className="space-y-3">
                        <MeasureRow label="Bust" value="84 cm" />

                        <MeasureRow label="Waist" value="62 cm" />

                        <MeasureRow label="Hip" value="88 cm" />

                        <MeasureRow label="Shoulder" value="38 cm" />

                        <MeasureRow label="Inseam" value="72 cm" />
                      </div>
                    </div>

                    {/* AI */}

                    <div className="rounded-xl bg-green-50 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-700">
                            AI Match Accuracy
                          </p>

                          <h3 className="mt-1 text-3xl font-bold text-green-600">
                            95%
                          </h3>
                        </div>

                        <div className="flex h-16 w-16 items-center justify-center rounded-full border-[6px] border-green-500 text-xl font-bold text-green-600">
                          ✓
                        </div>
                      </div>
                    </div>

                    {/* Button */}

                    <button className="w-full rounded-xl border border-primary py-3 font-medium text-primary transition hover:bg-primary hover:text-white">
                      ✨ Update Measurements
                    </button>
                  </div>
                </div>
              </div>

              {/* SAVED LOOK */}

              <div className="card p-5">
                {/* Header */}

                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-text">
                      Saved Looks
                    </h3>

                    <p className="mt-1 text-sm text-muted">
                      Your favorite cosplay inspirations
                    </p>
                  </div>

                  <button className="text-sm font-medium text-primary hover:underline">
                    View All →
                  </button>
                </div>

                {/* Grid */}

                <div className="grid grid-cols-4 gap-3">
                  {savedLooks.map((item) => (
                    <div key={item.id} className="group cursor-pointer">
                      <div className="relative aspect-3/4 overflow-hidden rounded-xl">
                        <Image
                          src={item.image}
                          alt={item.character}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-105"
                        />

                        <button className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow">
                          ❤️
                        </button>
                      </div>

                      <h4 className="mt-2 truncate font-medium">
                        {item.character}
                      </h4>

                      <p className="text-xs text-muted">{item.series}</p>
                    </div>
                  ))}
                </div>

                {/* Summary */}

                <div className="mt-5 rounded-xl bg-[#FCFBFA] p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF3EF]">
                      ⭐
                    </div>

                    <div>
                      <p className="text-sm text-muted">Total Saved Looks</p>

                      <h3 className="text-2xl font-bold">
                        {savedLooks.length}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* WISHLIST */}
              <div className="card p-5">
                {/* Header */}

                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-text">
                      Wishlist
                    </h3>

                    <p className="mt-1 text-sm text-muted">
                      Items waiting for you
                    </p>
                  </div>

                  <button className="text-sm font-medium text-primary hover:underline">
                    View All →
                  </button>
                </div>

                {/* List */}

                <div className="space-y-4">
                  {wishlistItems.map((item) => (
                    <div
                      key={item.id}
                      className="card flex items-center gap-3 rounded-xl border p-3 transition hover:border-primary"
                    >
                      <div className="relative h-20 w-16 overflow-hidden rounded-lg">
                        <Image
                          src={item.image}
                          alt={item.character}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="truncate font-semibold">
                          {item.character}
                        </h4>

                        <p className="truncate text-xs text-muted">
                          {item.series}
                        </p>

                        {/* Badge */}

                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-medium text-green-700">
                            Good Match
                          </span>

                          <span className="rounded-full bg-orange-100 px-2 py-1 text-[10px] font-medium text-orange-700">
                            Ready to Rent
                          </span>
                        </div>

                        <p className="mt-3 text-sm font-semibold text-primary">
                          Rp {item.price.toLocaleString("id-ID")}
                        </p>
                      </div>

                      <button className="rounded-lg bg-[#FFF4EE] p-2 text-primary transition hover:bg-primary hover:text-white">
                        ❤️
                      </button>
                    </div>
                  ))}
                </div>

                {/* Summary */}

                <div className="mt-5 rounded-xl bg-[#FCFBFA] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted">Total Wishlist</p>

                      <h3 className="text-2xl font-bold">
                        {wishlistItems.length}
                      </h3>
                    </div>

                    <button className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90">
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Grid */}

            <div className="grid gap-5 xl:grid-cols-[1.1fr_1fr_1fr]">
              <div className="card p-5">
                {/* Header */}

                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">Rental History</h3>

                    <p className="mt-1 text-sm text-muted">
                      Your recent cosplay rentals
                    </p>
                  </div>

                  <button className="text-sm font-medium text-primary hover:underline">
                    View All →
                  </button>
                </div>

                <div className="space-y-4">
                  {rentals.map((item) => (
                    <div
                      key={item.id}
                      className="card flex items-center gap-3 rounded-xl border p-3 transition hover:border-primary"
                    >
                      <div className="relative h-20 w-16 overflow-hidden rounded-lg">
                        <Image
                          src={item.image}
                          alt={item.character}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="truncate font-semibold">
                            {item.character}
                          </h4>

                          <StatusBadge status={item.status} />
                        </div>

                        <p className="text-xs text-muted">{item.series}</p>

                        <p className="mt-2 text-xs text-muted">{item.date}</p>

                        <div className="mt-3 flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={
                                star <= item.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-5">
                {/* Header */}

                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">Upcoming Events</h3>

                    <p className="mt-1 text-sm text-muted">
                      Events you&apos;re planning to attend
                    </p>
                  </div>

                  <button className="text-sm font-medium text-primary hover:underline">
                    Calendar →
                  </button>
                </div>

                <div className="space-y-4">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="card flex items-center gap-3 rounded-xl border p-3 transition hover:border-primary"
                    >
                      {/* Date */}

                      <div className="flex w-16 flex-col items-center justify-center rounded-xl bg-[#FFF4EE]">
                        <span className="text-xs uppercase text-muted">
                          {event.month}
                        </span>

                        <span className="text-2xl font-bold text-primary">
                          {event.day}
                        </span>
                      </div>

                      {/* Content */}

                      <div className="flex-1">
                        <h4 className="font-semibold">{event.title}</h4>

                        <p className="mt-1 text-sm text-muted">
                          📍 {event.location}
                        </p>

                        <p className="mt-1 text-xs text-muted">{event.time}</p>

                        <div className="mt-3 flex items-center justify-between">
                          <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-medium text-green-700">
                            Registered
                          </span>

                          <button className="text-sm text-primary hover:underline">
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">
                      Favorite Characters
                    </h3>

                    <p className="mt-1 text-sm text-muted">
                      Characters you cosplay the most
                    </p>
                  </div>

                  <button className="text-sm font-medium text-primary hover:underline">
                    Edit →
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {characters.map((item) => (
                    <div key={item.id} className="group text-center">
                      <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full ring-2 ring-[#F6D8C5] transition group-hover:ring-primary">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <h4 className="mt-3 text-sm font-medium">{item.name}</h4>

                      <p className="text-xs text-muted">{item.series}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl bg-[#FCFBFA] p-4">
                  <p className="text-sm text-muted">Most Cosplayed</p>

                  <h3 className="mt-2 text-xl font-semibold">Hu Tao</h3>

                  <p className="mt-1 text-sm text-primary">
                    8 different costume versions tried
                  </p>
                </div>
              </div>
            </div>

            {/* Banner */}

            <div className="overflow-hidden rounded-2xl bg-linear-to-r from-[#FFF4EE] via-[#FFF9F6] to-[#FFFDFB] shadow-sm">
              <div className="flex flex-col items-center justify-between gap-8 p-8 lg:flex-row">
                {/* Left */}

                <div className="flex items-center gap-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow">
                    🎯
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold text-text">
                      Complete Your Profile
                    </h2>

                    <p className="mt-2 max-w-xl leading-7 text-muted">
                      A complete profile helps CosFit AI generate a much more
                      accurate virtual try-on and recommend costumes that truly
                      fit your body.
                    </p>
                  </div>
                </div>

                {/* Right */}

                <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="font-semibold">Profile Completion</span>

                    <span className="font-bold text-primary">85%</span>
                  </div>

                  <div className="mb-6 h-3 overflow-hidden rounded-full bg-[#EFEAE4]">
                    <div className="h-full w-[85%] rounded-full bg-primary" />
                  </div>

                  <div className="space-y-3">
                    <CheckItem checked title="Upload Full Body Photo" />

                    <CheckItem checked title="Add Body Measurements" />

                    <CheckItem checked title="Verify Email" />

                    <CheckItem title="Connect Social Media" />
                  </div>

                  <button className="mt-6 h-12 w-full rounded-xl bg-primary font-semibold text-white transition hover:opacity-90">
                    Complete Profile
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function MeasureRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-2 last:border-none">
      <span className="text-muted">{label}</span>

      <span className="font-medium">{value}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "Completed"
      ? "bg-green-100 text-green-700"
      : status === "Returned"
        ? "bg-blue-100 text-blue-700"
        : "bg-orange-100 text-orange-700";

  return (
    <span className={`rounded-full px-2 py-1 text-[10px] font-medium ${color}`}>
      {status}
    </span>
  );
}

function CheckItem({
  title,
  checked = false,
}: {
  title: string;
  checked?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      {checked ? (
        <CheckCircle2 size={18} className="text-green-600" />
      ) : (
        <Circle size={18} className="text-gray-300" />
      )}

      <span>{title}</span>
    </div>
  );
}

"use client";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Shirt,
  ShoppingBag,
  Users,
  Calendar,
  MessageSquare,
  Settings,
} from "lucide-react";

const menus = [
  {
    title: "Dashboard",
    href: "/vendor",
    icon: LayoutDashboard,
  },
  {
    title: "Costume Management",
    href: "/vendor/costumes",
    icon: Shirt,
  },
  {
    title: "Orders",
    href: "/vendor/orders",
    icon: ShoppingBag,
  },
  {
    title: "Customers",
    href: "/vendor/customers",
    icon: Users,
  },
  {
    title: "Events",
    href: "/vendor/events",
    icon: Calendar,
  },
  {
    title: "Messages",
    href: "/vendor/messages",
    icon: MessageSquare,
    badge: 5,
  },
  {
    title: "Settings",
    href: "/vendor/settings",
    icon: Settings,
  },
];

export default function VendorSidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-70 flex-col border-r border-(--border) bg-white">
      {/* Logo */}

      <div className="px-8 py-8">
        <h1 className="text-[42px] font-bold tracking-tight">CosFit</h1>

        <p className="text-(--primary)">Vendor</p>
      </div>

      {/* Menu */}

      <nav className="space-y-2 px-5">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <Link
              key={menu.title}
              href={menu.href}
              className={`flex items-center justify-between rounded-2xl px-5 py-4 transition ${
                menu.title === "Dashboard"
                  ? "bg-linear-to-r from-[#FFF5F0] shadow-soft to-[#FFFDFB]  text-(--primary)"
                  : "hover:bg-[#FCFBFA]"
              }`}
            >
              <div className="flex items-center gap-4">
                <Icon size={20} />

                <span className="font-medium">{menu.title}</span>
              </div>

              {menu.badge && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-(--primary) text-xs text-white">
                  {menu.badge}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-5">
        <div className="card card-hover p-6">
          <div className="flex items-center gap-4">
            <Image
              src="/images/vendor-avatar.jpg"
              alt=""
              width={54}
              height={54}
              className="rounded-full"
            />

            <div>
              <h4 className="font-semibold">Starlight Cosplay</h4>

              <span className="badge-warning">Premium Vendor</span>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex justify-between text-sm">
              <span>Store Completeness</span>

              <span>85%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-[#F5E7DE]">
              <div className="h-full w-[85%] rounded-full bg-(--primary)" />
            </div>
          </div>

          <button className="secondary-btn hover-scale mt-6 w-full">
            View Profile
          </button>
        </div>
      </div>
    </aside>
  );
}

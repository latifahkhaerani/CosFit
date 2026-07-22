"use client";
import Link from "next/link";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { handleDeleteCookies } from "@/action";

const menus = [
  {
    title: "Dashboard",
    href: "/vendor",
    icon: LayoutDashboard,
  },
  {
    title: "Events",
    href: "/events",
    icon: Calendar,
  },
  {
    title: "Forum",
    href: "/forum",
    icon: MessageSquare,
  },
];

export default function VendorSidebar() {

  const route = useRouter()
    
  const handleLogout = async () => {
    // logout logic
    await handleDeleteCookies()
    route.push("/")
    route.refresh()
  };

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
            </Link>
          );
        })}
        <button
          className={`flex items-center justify-between rounded-2xl px-5 py-4 transition`}
          onClick={handleLogout}
        >
          <div className="flex items-center gap-4">
            <LogOut size={20} />

            <span className="font-medium">Log Out</span>
          </div>
        </button>
      </nav>
    </aside>
  );
}

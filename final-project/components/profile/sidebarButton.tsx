'use client'

import { handleDeleteCookies } from "@/action";
import Link from "next/link";

export default function SidebarItem({ title, icon, active }: SidebarItemProps) {
  const handleLogout = async () => {
    // logout logic
    await handleDeleteCookies()
    window.location.reload();
  };

  return title === "Logout" ? (
    <button
      onClick={handleLogout}
      className="mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-muted transition hover:bg-[#FAF7F4]"
    >
      {icon}
      <span>{title}</span>
    </button>
  ) : (
    <Link
      href="#"
      className={`mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition ${
        active
          ? "bg-[#FFF4EE] font-medium text-primary"
          : "text-muted hover:bg-[#FAF7F4]"
      }`}
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
}

type SidebarItemProps = {
  title: string;
  icon: React.ReactNode;
  active?: boolean;
};
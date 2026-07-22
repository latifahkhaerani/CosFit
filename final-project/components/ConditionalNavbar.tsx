"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import VendorSidebar from "./vendor/VendorSidebar";

const HIDDEN_ON = ["/login", "/register", "/vendor/login", "/vendor/register"];

export default function ConditionalNavbar({
  children,
  role,
}: {
  children: React.ReactNode;
  role: string | null;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (HIDDEN_ON.includes(pathname) || isAdminRoute) {
    return <>{children}</>;
  }

  if (role === "Vendor") {
    return (
      <div className="flex min-h-screen">
        <VendorSidebar />
        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>
    );
  }

  return (
    <>
      <Navbar isLoggedIn={!!role} />
      <main>{children}</main>
      <Footer />
    </>
  );
}

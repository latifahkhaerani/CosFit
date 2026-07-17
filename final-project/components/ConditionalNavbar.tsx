"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const HIDDEN_ON = ["/login", "/register"];

export default function ConditionalNavbar() {
  const pathname = usePathname();

  if (HIDDEN_ON.includes(pathname) || pathname.startsWith("/vendor")) return null;

  return <Navbar />;
}

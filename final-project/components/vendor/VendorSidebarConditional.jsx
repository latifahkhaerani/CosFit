"use client";

import { usePathname } from "next/navigation";
import VendorSidebar from "./VendorSidebar"

const HIDDEN_ON = ["/vendor/login", "/vendor/register"];

export default function ConditionalVendorSidebar() {
  const pathname = usePathname();

  if (HIDDEN_ON.includes(pathname)) return null;

  return <VendorSidebar />;
}

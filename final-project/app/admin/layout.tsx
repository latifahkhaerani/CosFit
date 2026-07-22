import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { MobileNav } from "@/components/admin/MobileNav";

export const metadata = {
  title: "Admin Dashboard | CosFit",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const role = headerList.get("x-user-role");

  if (role !== "Admin") {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1 bg-background p-6 md:p-8">{children}</main>
      </div>

      <MobileNav />
    </div>
  );
}

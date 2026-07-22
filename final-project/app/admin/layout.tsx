import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { MobileNav } from "@/components/admin/MobileNav";

export const metadata = {
  title: "Admin Dashboard | CosFit",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* Sidebar untuk Desktop */}
      <AdminSidebar />

      {/* Konten Utama */}
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>

      {/* Navigasi Bawah untuk Mobile */}
      <MobileNav />
    </div>
  );
}

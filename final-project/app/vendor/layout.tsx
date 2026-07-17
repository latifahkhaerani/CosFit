import ConditionalVendorSidebar from "@/components/vendor/VendorSidebarConditional";


export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
        <ConditionalVendorSidebar/>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
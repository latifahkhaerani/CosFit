import VendorSidebar from "@/components/vendor/VendorSidebar";
import ProductGallery from "@/components/vendor/ProductGallery";
import ProductInfoCard from "@/components/vendor/ProductInfoCard";
import AISizeMatchCard from "@/components/vendor/AISizeMatchCard";
import AnalyticsCard from "@/components/vendor/AnalyticsCard";
import ProductDescriptionCard from "@/components/vendor/ProductDescriptionCard";
import RentalHistoryCard from "@/components/vendor/RentalHistoryCard";
import ProductReviewCard from "@/components/vendor/ProductReviewCard";

export default function VendorProductDetail() {
  return (
    <main className="flex min-h-screen bg-[var(--background)]">
      <VendorSidebar />

      <section className="page-container flex-1">
        {/* Header */}
        {/* breadcrumb */}
        <nav className="mb-3 flex items-center gap-2 text-sm">
          <span className="text-[var(--muted)]">Dashboard</span>

          <span className="text-[var(--muted)]">/</span>

          <span className="text-[var(--muted)]">Costumes</span>

          <span className="text-[var(--muted)]">/</span>

          <span className="font-medium text-[var(--text)]">
            Crimson Valkyrie Armor
          </span>
        </nav>

        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-4xl font-bold">
              Crimson Valkyrie Armor
              <span className="badge-success">Published</span>
            </h1>

            <p className="mt-2 text-sm text-[var(--muted)]">
              Product ID: CF-PRD-2024-0815 • Updated 2 days ago
            </p>

            <div className="mt-6 flex flex-wrap gap-3">

    <span className="badge-success">

        Published

    </span>

    <span className="badge-warning">

        Featured Costume

    </span>

    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">

        3 Active Rentals

    </span>

</div>
          </div>

          <div className="flex gap-3">
            <button className="secondary-btn">Preview</button>

            <button className="secondary-btn">Edit</button>

            <button className="rounded-2xl border border-red-200 px-6 py-3 text-red-500">
              Delete
            </button>
          </div>
        </div>
        <div className="grid grid-cols-[2.1fr_1fr] gap-7">
          <ProductGallery />

          <div className="space-y-7">
            <ProductInfoCard />

            <AISizeMatchCard />

            <AnalyticsCard />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-[2fr_1fr] gap-7">
          <div className="space-y-7">
            <ProductDescriptionCard />

            <RentalHistoryCard />
          </div>

          <ProductReviewCard />
        </div>
      </section>
    </main>
  );
}

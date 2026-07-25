"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRightIcon,
} from "lucide-react";

export default function WishlistDetailPage() {
  const previews = [
    "/images/hutao-tryon.jpg",
    "/images/hutao-tryon.jpg",
    "/images/hutao-tryon.jpg",
    "/images/hutao-tryon.jpg",
    "/images/hutao-tryon.jpg",
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-362.5 px-6 py-8">
        {/* Breadcrumb */}

        <div className="mb-8 flex items-center gap-2 text-sm text-muted">
          <Link href="/">Home</Link>

          <ChevronRight size={15} />

          <Link href="/wishlist">Wishlist</Link>

          <ChevronRight size={15} />

          <span className="font-medium text-primary">Hu Tao</span>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.65fr_1fr]">
          {/* ================= LEFT ================= */}

          <section>
            {/* Preview Card */}

            <div className="rounded-4xl border border-border bg-white p-6 shadow-sm">
              {/* Header */}

              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-text">
                  Your AI Try-On Preview
                </h2>

                <div className="flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-600">
                  <CheckCircle2 size={16} />
                  Good Size Match
                </div>
              </div>

              <div className="grid grid-cols-[80px_1fr] gap-6">
                {/* Thumbnail */}

                <div className="space-y-4">
                  {previews.map((img, index) => (
                    <button
                      key={index}
                      className={`relative aspect-3/4 overflow-hidden rounded-2xl border transition ${
                        index === 0
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>

                {/* Main Image */}

                <div>
                  <div className="relative aspect-16/11 overflow-hidden rounded-3xl">
                    <Image
                      src="/images/hutao-tryon.jpg"
                      alt="Try On"
                      fill
                      className="object-cover"
                    />

                    {/* Before After */}

                    <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white/90" />

                    <button className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg">
                      ↔
                    </button>

                    <span className="absolute bottom-5 left-[44%] rounded-full bg-black/60 px-3 py-1 text-sm text-white">
                      Before
                    </span>

                    <span className="absolute bottom-5 left-[54%] rounded-full bg-black/60 px-3 py-1 text-sm text-white">
                      After
                    </span>

                    {/* Arrow */}

                    <button className="absolute left-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md">
                      <ChevronLeft size={20} />
                    </button>

                    <button className="absolute right-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md">
                      <ChevronRightIcon size={20} />
                    </button>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-sm text-muted">
                AI results may vary. This preview is generated based on your
                uploaded body photo and costume reference.
              </p>
            </div>

            {/* Before After */}

            <div className="mt-8 rounded-4xl border border-border bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-text">Before vs After</h3>

              <p className="mt-1 text-muted">
                Compare how the costume looks on you.
              </p>

              <div className="mt-6 grid overflow-hidden rounded-3xl border border-border lg:grid-cols-2">
                {/* Before */}

                <div className="relative aspect-16/10">
                  <Image
                    src="/images/user-before.jpg"
                    alt=""
                    fill
                    className="object-cover"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-medium shadow">
                    Before
                  </span>
                </div>

                {/* After */}

                <div className="relative aspect-16/10">
                  <Image
                    src="/images/hutao-tryon.jpg"
                    alt=""
                    fill
                    className="object-cover"
                  />

                  <span className="absolute right-4 top-4 rounded-full bg-primary px-4 py-2 text-sm text-white">
                    AI Try-On
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ================= RIGHT ================= */}

          <aside className="space-y-6">
            {/* PART 1B STARTS HERE */}
            {/* Selected Costume */}

            <div className="rounded-[30px] border border-border bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-2xl font-bold text-text">
                Selected Costume
              </h3>

              <div className="flex gap-5">
                <div className="relative h-36 w-28 overflow-hidden rounded-2xl">
                  <Image
                    src="/images/hutao-card.jpg"
                    alt="Hu Tao"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-text">Hu Tao</h2>

                    <p className="mt-1 text-muted">Genshin Impact</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/vendor-avatar.jpg"
                        alt=""
                        width={24}
                        height={24}
                        className="rounded-full"
                      />

                      <span className="text-sm text-muted">
                        Starlight Cosplay
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-yellow-500">
                      ⭐ 4.9 (128 Reviews)
                    </p>
                  </div>

                  <div>
                    <p className="text-4xl font-bold text-primary">
                      Rp 450.000
                    </p>

                    <span className="text-muted">/ 3 Days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Body Profile */}

    

            {/* Vendor */}

            <div className="rounded-[30px] border border-border bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-2xl font-bold">Vendor Information</h3>

              <div className="flex items-center gap-5">
                <Image
                  src="/images/vendor-avatar.jpg"
                  width={70}
                  height={70}
                  alt=""
                  className="rounded-full"
                />

                <div className="flex-1">
                  <h4 className="text-xl font-bold">Starlight Cosplay</h4>

                  <p className="mt-1 text-muted">Professional cosplay vendor</p>

                  <p className="mt-1 text-muted">5+ years experience</p>
                </div>

                <button className="rounded-xl border border-primary px-5 py-3 font-medium text-primary transition hover:bg-primary hover:text-white">
                  View Shop
                </button>
              </div>

              <div className="mt-6 flex gap-8 text-sm">
                <span>
                  ⭐ <b>4.9</b> (128)
                </span>

                <span>❤️ 98% Positive Reviews</span>

                <span>📦 2.3k Rentals</span>
              </div>
            </div>
            {/* Rental Information */}

            <div className="rounded-[30px] border border-border bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-2xl font-bold text-text">
                Rental Information
              </h3>

              <div className="space-y-5">
                <div className="flex items-center justify-between rounded-2xl bg-[#FCFBFA] p-4">
                  <div>
                    <p className="text-sm text-muted">Rental Duration</p>

                    <h4 className="mt-1 text-lg font-semibold">3 Days</h4>
                  </div>

                  <button className="rounded-xl border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white transition">
                    Change
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-[#FCFBFA] p-4">
                  <div>
                    <p className="text-sm text-muted">Pickup</p>

                    <h4 className="mt-1 text-lg font-semibold">Store Pickup</h4>
                  </div>

                  <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-600">
                    Available
                  </span>
                </div>

                <div className="rounded-2xl bg-[#FCFBFA] p-4">
                  <p className="text-sm text-muted">Rental Notes</p>

                  <textarea
                    rows={4}
                    placeholder="Write a message to the vendor..."
                    className="mt-3 w-full resize-none rounded-xl border border-border bg-white p-3 outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Price Summary */}

            <div className="rounded-[30px] border border-border bg-white shadow-sm overflow-hidden">
              <div className="border-b border-border p-6">
                <h3 className="text-2xl font-bold">Price Summary</h3>
              </div>

              <div className="space-y-4 p-6">
                <div className="flex justify-between">
                  <span className="text-muted">Costume Rental</span>

                  <span>Rp450.000</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted">Service Fee</span>

                  <span>Rp20.000</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted">Insurance</span>

                  <span>Rp30.000</span>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="text-xl font-semibold">Total</span>

                    <span className="text-3xl font-bold text-primary">
                      Rp500.000
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}

            <div className="rounded-[30px] border border-border bg-white p-6 shadow-sm">
              <div className="grid gap-4">
                <button className="flex h-14 items-center justify-center gap-3 rounded-2xl bg-primary text-lg font-semibold text-white transition hover:scale-[1.01] hover:bg-secondary">
                  Rent This Costume
                </button>

                <button className="flex h-14 items-center justify-center gap-3 rounded-2xl border border-primary font-medium text-primary transition hover:bg-primary hover:text-white">
                  Try Another Costume
                </button>

                <button className="flex h-14 items-center justify-center gap-3 rounded-2xl border border-red-200 text-red-500 transition hover:bg-red-50">
                  Remove From Wishlist
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Recommendation */}

        <section className="mt-20">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold text-text">Similar Costumes</h2>

              <p className="mt-2 text-muted">
                You may also like these cosplay costumes.
              </p>
            </div>

            <button className="rounded-xl border border-primary px-5 py-3 text-primary hover:bg-primary hover:text-white transition">
              View All
            </button>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {/* nanti tinggal map ProductCard */}
          </div>
        </section>
      </div>
    </main>
  );
}

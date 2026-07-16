"use client";

import Image from "next/image";
import {
  Check,
  Sparkles,
  Pencil,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-background pb-20">
      {/* STEP */}

      <section className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <h1 className="text-4xl font-bold text-primary">CosFit</h1>

          <div className="hidden items-center gap-12 lg:flex">
            <Step active number={1} title="Checkout" />

            <Step number={2} title="Review" />

            <Step number={3} title="Payment" />

            <Step number={4} title="Confirmation" />
          </div>

          <div className="flex items-center gap-2 text-sm text-muted">
            🔒 Secure Checkout
          </div>
        </div>
      </section>

      <div className="mx-auto mt-10 max-w-7xl px-6">
        {/* Heading */}

        <div className="mb-8">
          <h2 className="flex items-center gap-2 text-4xl font-bold">
            Checkout
            <Sparkles className="text-accent" size={22} />
          </h2>

          <p className="mt-2 text-muted">Almost there! Complete your rental.</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.6fr_420px]">
          {/* LEFT */}

          <section className="space-y-5">
            {/* Costume */}

            <div className="card p-5">
              <div className="mb-5 flex items-center gap-3">
                <CircleNumber number={1} />

                <h3 className="text-xl font-semibold">Selected Costume</h3>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-5">
                  <div className="relative h-28 w-24 overflow-hidden rounded-xl">
                    <Image
                      src="/images/hutao-card.jpg"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-center">
                    <h4 className="text-2xl font-semibold">Hu Tao</h4>

                    <p className="text-muted">Genshin Impact</p>

                    <p className="mt-2 text-sm">
                      Vendor
                      <span className="ml-1 font-medium">
                        Starlight Cosplay
                      </span>
                    </p>

                    <div className="mt-3 flex gap-2">
                      <span className="rounded-full bg-orange-50 px-3 py-1 text-xs">
                        Size M
                      </span>

                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                        Good Match
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <h3 className="text-3xl font-bold text-primary">Rp450.000</h3>

                  <p className="text-muted">/ 3 Days</p>

                  <button className="mt-5 flex items-center gap-2 rounded-xl border border-primary px-4 py-2 text-primary transition hover:bg-primary hover:text-white">
                    <Pencil size={15} />
                    Edit
                  </button>
                </div>
              </div>
            </div>

            {/* Rental */}

            <div className="card p-5">
              <div className="mb-5 flex items-center gap-3">
                <CircleNumber number={2} />

                <h3 className="text-xl font-semibold">Rental Duration</h3>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto]">
                <InfoBox title="Pickup" value="24 May 2025" sub="10:00 AM" />

                <div className="flex items-center justify-center">
                  <ArrowRight className="text-primary" />
                </div>

                <InfoBox title="Return" value="27 May 2025" sub="10:00 AM" />

                <button className="flex h-12 items-center justify-center gap-2 rounded-xl border border-primary px-5 text-primary transition hover:bg-primary hover:text-white">
                  <CalendarDays size={18} />
                  Change
                </button>
              </div>
            </div>

            {/* Vendor Information */}

            <div className="card p-5">
              <div className="mb-5 flex items-center gap-3">
                <CircleNumber number={3} />

                <h3 className="text-xl font-semibold">Vendor Information</h3>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src="/images/vendor-avatar.jpg"
                    alt="Vendor"
                    width={64}
                    height={64}
                    className="rounded-full"
                  />

                  <div>
                    <h4 className="font-semibold text-lg">Starlight Cosplay</h4>

                    <p className="text-sm text-muted">
                      Professional Cosplay Studio
                    </p>

                    <div className="mt-2 flex items-center gap-4 text-sm">
                      <span>⭐ 4.9 (128)</span>

                      <span className="text-green-600">98% Positive</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="rounded-xl border border-primary px-5 py-2 text-primary transition hover:bg-primary hover:text-white">
                    View Shop
                  </button>

                  <button className="rounded-xl bg-primary px-5 py-2 text-white transition hover:opacity-90">
                    Chat Vendor
                  </button>
                </div>
              </div>
            </div>

            {/* Pickup / Delivery */}

            <div className="card p-5">
              <div className="mb-5 flex items-center gap-3">
                <CircleNumber number={4} />

                <h3 className="text-xl font-semibold">Pickup or Delivery</h3>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Pickup */}

                <div className="cursor-pointer rounded-2xl card bg-[#baa9a4] p-5 transition">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                        🏪
                      </div>

                      <div>
                        <h4 className="font-semibold">Pickup</h4>

                        <p className="text-sm text-muted">
                          Collect from vendor
                        </p>
                      </div>
                    </div>

                    <Check className="text-primary" />
                  </div>

                  <div className="mt-5 text-sm leading-7 text-muted">
                    <p>Starlight Cosplay Studio</p>

                    <p>Jl. Kemang Raya No.12</p>

                    <p>Jakarta Selatan</p>

                    <p className="mt-2">24 May 2025 • 10:00 AM</p>
                  </div>
                </div>

                {/* Delivery */}

                <div className="cursor-poi nter rounded-2xl card bg-[#baa9a4] p-5 transition">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background">
                      🚚
                    </div>

                    <div>
                      <h4 className="font-semibold">Delivery</h4>

                      <p className="text-sm text-muted">Ship to your address</p>
                    </div>
                  </div>

                  <p className="mt-6 text-sm leading-7 text-muted">
                    Shipping fee will be calculated after you enter your
                    address.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Information */}

            <div className="card p-5">
              <div className="mb-5 flex items-center gap-3">
                <CircleNumber number={5} />

                <h3 className="text-xl font-semibold">
                  Additional Information
                </h3>
              </div>

              <div className="card p-5 grid gap-5 lg:grid-cols-[1fr_340px]">
                {/* Notes */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Notes to Vendor
                  </label>

                  <textarea
                    rows={5}
                    placeholder="Any special request, body adjustment, event date..."
                    className="card w-full resize-none rounded-xl border p-4 outline-none transition focus:border-primary"
                  />

                  <p className="mt-2 text-right text-xs text-muted">0 / 300</p>
                </div>

                {/* Promo */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Promo Code
                  </label>

                  <div className="flex gap-3">
                    <input
                      placeholder="Enter promo"
                      className="flex-1 soft-bg rounded-2xl p-4 px-4 outline-none focus:border-primary"
                    />

                    <button className="rounded-xl bg-primary px-5 text-white transition hover:opacity-90">
                      Apply
                    </button>
                  </div>

                  <p className="mt-3 text-xs text-muted">
                    Promo will be validated before payment.
                  </p>

                  {/* AI Match */}

                  <div className="mt-6 rounded-xl bg-green-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white">
                        ✓
                      </div>

                      <div>
                        <p className="font-semibold text-green-700">
                          AI Fit Score • 95%
                        </p>

                        <p className="text-sm text-green-600">
                          This costume is highly recommended for your body
                          measurements.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT SIDEBAR */}

          <aside className="sticky top-24 h-fit space-y-5">
            {/* Order Summary */}

            <div className="card p-5">
              <h3 className="mb-5 text-xl font-semibold">Order Summary</h3>

              <div className="flex gap-4">
                <div className="relative h-24 w-20 overflow-hidden rounded-xl">
                  <Image
                    src="/images/hutao-card.jpg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-lg">Hu Tao</h4>

                  <p className="text-sm text-muted">Genshin Impact</p>

                  <p className="mt-3 text-primary font-semibold">Rp450.000</p>

                  <p className="text-sm text-muted">3 Days Rental</p>
                </div>
              </div>

              <div className="my-5 border-t border-border" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Costume Rental</span>

                  <span>Rp450.000</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted">Rental Protection</span>

                  <span>Rp25.000</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted">Service Fee</span>

                  <span>Rp22.500</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted">Shipping</span>

                  <span>Rp15.000</span>
                </div>
              </div>

              <div className="my-5 border-t border-border" />

              <div className="flex items-center justify-between">
                <span className="font-semibold">Total</span>

                <span className="text-3xl font-bold text-primary">
                  Rp512.500
                </span>
              </div>
            </div>

            {/* Payment */}

            <div className="card p-5">
              <h3 className="mb-5 text-xl font-semibold">Payment Method</h3>

              <div className="space-y-3">
                <PaymentCard active title="Credit / Debit Card" icon="💳" />

                <PaymentCard title="Bank Transfer" icon="🏦" />

                <PaymentCard title="E-Wallet" icon="📱" />

                <PaymentCard title="ShopeePay" icon="🛍️" />

                <PaymentCard title="PayLater" icon="💰" />
              </div>
            </div>

            {/* Security */}

            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                  🛡️
                </div>

                <div>
                  <h4 className="font-semibold">Secure Checkout</h4>

                  <p className="mt-1 text-sm text-muted">
                    All payment information is encrypted and protected.
                  </p>
                </div>
              </div>
            </div>

            {/* Coupon */}

            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <h4 className="font-semibold">Have a Coupon?</h4>

              <div className="mt-4 flex gap-3">
                <input
                  placeholder="Promo Code"
                  className="flex-1 soft-bg rounded-2xl p-4 px-4 py-3 outline-none focus:border-primary"
                />

                <button className="rounded-xl bg-primary px-5 text-white">
                  Apply
                </button>
              </div>
            </div>

            {/* Checkout */}

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <button className="h-12 w-full rounded-xl bg-primary text-lg font-semibold text-white transition hover:opacity-90">
                Place Order
              </button>

              <button className="mt-3 h-12 w-full rounded-xl border border-primary text-primary transition hover:bg-primary hover:text-white">
                Save for Later
              </button>

              <p className="mt-5 text-center text-xs text-muted">
                By placing this order you agree to our Terms of Service &
                Privacy Policy.
              </p>
            </div>
          </aside>

          {/* BENEFITS */}

          <section className="mt-16">
            <div className="grid gap-5 lg:grid-cols-3">
              <BenefitCard
                icon="🤖"
                title="AI Size Matching"
                description="Every recommendation is generated based on your body profile."
              />

              <BenefitCard
                icon="🛡️"
                title="Rental Protection"
                description="Protected transactions and trusted cosplay rental partners."
              />

              <BenefitCard
                icon="🚚"
                title="Flexible Pickup"
                description="Pickup in store or request delivery from your vendor."
              />
            </div>
          </section>

          {/* NEED HELP */}

          <section className="mt-12 rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
              <div>
                <h3 className="text-2xl font-semibold">
                  Need Help Before Checkout?
                </h3>

                <p className="mt-2 text-muted">
                  Our cosplay specialists are happy to assist you with sizing,
                  rental policies, and costume recommendations.
                </p>
              </div>

              <div className="flex gap-4">
                <button className="rounded-xl border border-primary px-5 py-3 text-primary transition hover:bg-primary hover:text-white">
                  Chat Support
                </button>

                <button className="rounded-xl bg-primary px-5 py-3 text-white transition hover:opacity-90">
                  Contact Vendor
                </button>
              </div>
            </div>
          </section>

          {/* YOU MAY ALSO LIKE */}

          <section className="mt-16">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">You May Also Like</h2>

                <p className="mt-2 text-muted">
                  Similar costumes recommended for you.
                </p>
              </div>

              <button className="rounded-xl border border-primary px-5 py-2 text-primary transition hover:bg-primary hover:text-white">
                View All
              </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {/* nanti tinggal */}

              {/* <ProductCard /> */}

              {/* <ProductCard /> */}

              {/* <ProductCard /> */}

              {/* <ProductCard /> */}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

type StepProps = {
  active?: boolean;
  number: number;
  title: string;
};

function Step({ active, number, title }: StepProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold ${
          active ? "border-primary bg-primary text-white" : "border-border"
        }`}
      >
        {active ? <Check size={16} /> : number}
      </div>

      <span
        className={`${active ? "font-semibold text-primary" : "text-muted"}`}
      >
        {title}
      </span>
    </div>
  );
}

function CircleNumber({ number }: { number: number }) {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
      {number}
    </div>
  );
}

function InfoBox({
  title,
  value,
  sub,
}: {
  title: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-xl bg-[#FCFBFA] p-4">
      <p className="text-sm text-muted">{title}</p>

      <h4 className="mt-1 text-lg font-semibold">{value}</h4>

      <p className="text-sm text-muted">{sub}</p>
    </div>
  );
}

type PaymentCardProps = {
  title: string;
  icon: string;
  active?: boolean;
};

function PaymentCard({ title, icon, active }: PaymentCardProps) {
  return (
    <button
      className={`flex w-full items-center justify-between rounded-xl border p-4 transition ${
        active
          ? "border-primary bg-[#FFF8F6]"
          : "border-border hover:border-primary"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>

        <span className="font-medium">{title}</span>
      </div>

      <div
        className={`h-5 w-5 rounded-full border-2 ${
          active ? "border-primary bg-primary" : "border-border"
        }`}
      />
    </button>
  );
}

type BenefitCardProps = {
  icon: string;
  title: string;
  description: string;
};

function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF8F6] text-2xl">
        {icon}
      </div>

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
    </div>
  );
}

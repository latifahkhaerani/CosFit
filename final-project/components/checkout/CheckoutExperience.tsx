"use client";

import Image from "next/image";
import {
  Check,
  Sparkles,
  CalendarDays,
  ArrowRight,
  Minus,
  Plus,
} from "lucide-react";
import { useMemo, useState } from "react";
import { GetProduct, GetVendor } from "../../app/types";

type GroupedProduct = {
  product: GetProduct;
  quantity: number;
};

type CheckoutExperienceProps = {
  groupedProducts: GroupedProduct[];
  vendor: GetVendor;
};

export default function CheckoutExperience({
  groupedProducts,
  vendor,
}: CheckoutExperienceProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(
      groupedProducts.map((item) => [item.product._id, item.quantity]),
    ),
  );

  const selectedItems = useMemo(
    () =>
      groupedProducts
        .map((item) => ({
          ...item,
          quantity: quantities[item.product._id] ?? item.quantity,
        }))
        .filter((item) => (item.quantity ?? 0) > 0),
    [groupedProducts, quantities],
  );

  const subtotal = selectedItems.reduce(
    (total, item) =>
      total + Number(item.product.originalPrice) * (item.quantity || 0),
    0,
  );

  const protection = 25000;
  const serviceFee = 22500;
  const shipping = 15000;
  const total = subtotal + protection + serviceFee + shipping;

  const updateQuantity = (id: string, nextValue: number) => {
    setQuantities((current) => ({
      ...current,
      [id]: Math.max(0, nextValue),
    }));
  };

  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">(
    "pickup",
  );
  return (
    <main className="min-h-screen bg-background m-5">
      <div className="pt-5 flex flex-col gap-2 pl-3">
        <h2 className="flex items-center gap-2  text-3xl font-bold tracking-tight lg:text-4xl">
          Checkout
          <Sparkles className="text-accent" size={22} />
        </h2>

        <p className="max-w-2xl text-sm leading-7 text-muted lg:text-base">
          Almost there! Complete your rental.
        </p>
      </div>

      {/* <section className="sticky top-0 z-40 border-b border-border/60 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-360 items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-10">
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
      </section> */}

      <div className="mx-auto max-w-360 px-4 py-8 sm:px-6 lg:px-8 xl:px-10 xl:py-10">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
          <section className="space-y-5">
            <div className="card rounded-3xl p-6">
              <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <CircleNumber number={1} />
                  <h3 className="text-lg font-semibold">Selected Costumes</h3>
                </div>

                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {selectedItems.length} Item
                  {selectedItems.length > 1 && "s"}
                </span>
              </div>

              <div className="space-y-5">
                {selectedItems.map(({ product, quantity }) => {
                  const unitPrice = Number(product.originalPrice);
                  const subtotalItem = unitPrice * quantity;
                  return (
                    <div
                      key={product._id}
                      className="flex flex-col gap-5 rounded-2xl border border-border/80 bg-[#fcfbfa] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md lg:flex-row lg:items-center lg:justify-between"
                    >
                      <div className="flex gap-4">
                        <div className="relative h-32 w-24 overflow-hidden rounded-2xl">
                          <Image
                            src={product.imgUrl}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex flex-col justify-between">
                          <div>
                            <h4 className="text-xl font-semibold">
                              {product.title}
                            </h4>

                            <p className="mt-1 text-sm text-muted">
                              {product.theme}
                            </p>

                            <p className="mt-3 text-sm">
                              Vendor{" "}
                              <span className="font-semibold">
                                {vendor.namaToko}
                              </span>
                            </p>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700">
                              Size {product.size}
                            </span>

                            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                              ✓ Good Match
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 lg:items-end">
                        <div className="flex flex-col gap-2">
                          <div className="inline-flex items-center rounded-full border border-border/80 bg-background shadow-sm">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(product._id, quantity - 1)
                              }
                              className="flex h-10 w-10 items-center justify-center rounded-l-full border-r border-border/80 text-lg font-semibold text-foreground transition-all duration-200 hover:bg-primary hover:text-white"
                            >
                              <Minus size={16} />
                            </button>

                            <div className="flex h-10 min-w-14 items-center justify-center px-4 text-sm font-semibold text-foreground">
                              {quantity}
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(product._id, quantity + 1)
                              }
                              className="flex h-10 w-10 items-center justify-center rounded-r-full border-l border-border/80 text-lg font-semibold text-foreground transition-all duration-200 hover:bg-primary hover:text-white"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>

                        <div className="text-left lg:text-right">
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                            Price / costume
                          </p>
                          <h3 className="mt-1 text-2xl font-bold text-primary">
                            Rp {unitPrice.toLocaleString("id-ID")}
                          </h3>
                        </div>

                        {/* <div className="text-left lg:text-right">
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                            Subtotal
                          </p>
                          <h3 className="mt-1 text-xl font-semibold text-primary">
                            Rp {subtotalItem.toLocaleString("id-ID")}
                          </h3>
                        </div> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card rounded-3xl p-5 lg:p-6">
              <div className="mb-6 flex items-center gap-3 border-b border-border pb-4">
                <CircleNumber number={2} />

                <h3 className="text-lg font-semibold tracking-tight">
                  Rental Duration
                </h3>
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

            <div className="card rounded-3xl p-5 lg:p-6">
              <div className="mb-6 flex items-center gap-3 border-b border-border pb-4">
                <CircleNumber number={3} />

                <h3 className="text-lg font-semibold tracking-tight">
                  Vendor Information
                </h3>
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
                    <h4 className="font-semibold text-lg">{vendor.namaToko}</h4>

                    <p>{vendor.alamat}</p>

                    <div className="mt-2 flex items-center gap-4 text-sm">
                      <span>⭐ 4.9 (128) | no rating yet</span>

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

            <div className="card rounded-3xl p-5 lg:p-6">
              <div className="mb-6 flex items-center gap-3 border-b border-border pb-4">
                <CircleNumber number={4} />

                <h3 className="text-lg font-semibold tracking-tight">
                  Pickup or Delivery
                </h3>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* PICKUP */}

                <button
                  type="button"
                  onClick={() => setDeliveryMethod("pickup")}
                  className={`rounded-3xl border p-5 text-left transition-all duration-200
      ${
        deliveryMethod === "pickup"
          ? "border-primary bg-primary/5 ring-2 ring-primary/10"
          : "border-border bg-white hover:border-primary/50 hover:shadow-md"
      }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl
          ${
            deliveryMethod === "pickup"
              ? "bg-primary text-white"
              : "bg-primary/10 text-primary"
          }`}
                      >
                        🏪
                      </div>

                      <div>
                        <h4 className="font-semibold text-lg">Pickup</h4>

                        <p className="mt-1 text-sm text-muted">
                          Collect directly from vendor
                        </p>
                      </div>
                    </div>

                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full border
        ${
          deliveryMethod === "pickup"
            ? "border-primary bg-primary text-white"
            : "border-border"
        }`}
                    >
                      {deliveryMethod === "pickup" && <Check size={14} />}
                    </div>
                  </div>

                  <div className="mt-5 border-t border-border pt-4 text-sm leading-7">
                    <p className="font-medium">{vendor.namaToko}</p>

                    <p className="text-muted">{vendor.alamat}</p>

                    <p className="mt-3 flex items-center gap-2 text-muted">
                      🕒 24 May 2025 • 10:00 AM
                    </p>
                  </div>
                </button>

                {/* DELIVERY */}

                <button
                  type="button"
                  onClick={() => setDeliveryMethod("delivery")}
                  className={`flex h-full flex-col rounded-3xl border p-5 text-left transition-all duration-200
    ${
      deliveryMethod === "delivery"
        ? "border-primary bg-primary/5 ring-2 ring-primary/10"
        : "border-border bg-white hover:border-primary/50 hover:shadow-md"
    }`}
                >
                  {/* HEADER */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-colors
          ${
            deliveryMethod === "delivery"
              ? "bg-primary text-white"
              : "bg-primary/10 text-primary"
          }`}
                      >
                        🚚
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold">Delivery</h4>

                        <p className="mt-1 text-sm text-muted">
                          Ship directly to your address
                        </p>
                      </div>
                    </div>

                    <div
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors
        ${
          deliveryMethod === "delivery"
            ? "border-primary bg-primary text-white"
            : "border-border"
        }`}
                    >
                      {deliveryMethod === "delivery" && <Check size={14} />}
                    </div>
                  </div>

                  {/* BODY */}
                  <div className="mt-5 flex-1 border-t border-border pt-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <p className="text-muted">
                          <span className="font-medium">
                            Shipping fee will be calculated automatically after
                            your delivery address is entered.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="card rounded-3xl p-5 lg:p-6">
              <div className="mb-6 flex items-center gap-3 border-b border-border pb-4">
                <CircleNumber number={5} />

                <h3 className="text-lg font-semibold tracking-tight">
                  Additional Information
                </h3>
              </div>

              <div className="card p-5 ">
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
              </div>
            </div>
          </section>

          <aside className="sticky top-24 h-fit space-y-5">
            <div className="card rounded-3xl p-5 lg:p-6">
              <h3 className="mb-5 text-lg font-semibold tracking-tight">
                Order Summary
              </h3>

              <div className="space-y-4">
                {selectedItems.map(({ product, quantity }) => (
                  <div key={product._id} className="flex gap-4">
                    <div className="relative h-24 w-20 overflow-hidden rounded-xl">
                      <Image
                        src={product.imgUrl}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold">
                          {product.title}
                        </h4>

                        <span className="rounded-full bg-background px-2 py-1 text-xs font-medium">
                          × {quantity}
                        </span>
                      </div>

                      <p className="text-sm text-muted">{product.theme}</p>

                      <h3 className="text-lg font-bold text-primary">
                        Rp{" "}
                        {(
                          Number(product.originalPrice) * quantity
                        ).toLocaleString("id-ID")}
                      </h3>

                      <p className="text-sm text-muted">Size {product.size}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="my-5 border-t border-border" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Costume Rental</span>
                  <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted">Rental Protection</span>
                  <span>Rp {protection.toLocaleString("id-ID")}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted">Service Fee</span>
                  <span>Rp {serviceFee.toLocaleString("id-ID")}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted">Shipping</span>
                  <span>Rp {shipping.toLocaleString("id-ID")}</span>
                </div>
              </div>

              <div className="my-5 border-t border-border" />

              <div className="flex items-center justify-between">
                <span className="font-semibold">Total</span>

                <span className="text-3xl font-bold text-primary">
                  Rp {total.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <div className="card rounded-3xl p-5 lg:p-6">
              <h3 className="mb-5 text-lg font-semibold tracking-tight">
                Payment Method
              </h3>

              <div className="space-y-3">
                <PaymentCard active title="Credit / Debit Card" icon="💳" />
                <PaymentCard title="Bank Transfer" icon="🏦" />
                <PaymentCard title="E-Wallet" icon="📱" />
                <PaymentCard title="ShopeePay" icon="🛍️" />
                <PaymentCard title="PayLater" icon="💰" />
              </div>
            </div>

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
        </div>

        <div className="mt-12 space-y-8 xl:mt-16">
          <section>
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

          <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
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

          <section>
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
              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm" />
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
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
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
        <span className="text-lg font-semibold tracking-tight">{icon}</span>
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

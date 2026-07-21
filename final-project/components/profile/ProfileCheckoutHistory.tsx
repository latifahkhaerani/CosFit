"use client";

import { Clock3 } from "lucide-react";
import { GetCheckout } from "@/app/types";
import CheckoutCard from "./CheckoutCard";

type Props = {
  checkout: GetCheckout[];
};

export default function ProfileCheckoutHistory({ checkout }: Props) {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col justify-between gap-5 rounded-3xl border border-[#efe4db] bg-white p-8 lg:flex-row lg:items-center">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF3EF]">
            <Clock3 className="text-[#B14744]" size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-[#1f1a17]">
              Checkout History
            </h1>

            <p className="mt-1 text-[#7d746d]">Your cosplay rental history.</p>
          </div>
        </div>

        {/* <div className="rounded-xl border border-[#F3E7DD] px-4 py-3">
          <p className="text-xs text-[#9C8E83]">Total Checkout</p>

          <p className="mt-1 text-2xl font-semibold text-primary text-right">
            {checkout.length}
          </p>
        </div> */}
      </div>

      {/* Content */}

      <div className="rounded-3xl border border-[#efe4db] bg-white p-6">
        {checkout.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Clock3 size={46} className="mb-5 text-primary" />

            <h2 className="text-2xl font-semibold text-[#1f1a17]">
              No checkout history
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-muted">
              Your rental history will appear here after you checkout a costume.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {checkout.map((item) => (
              <CheckoutCard
                key={item._id}
                image={item.product.imgUrl}
                character={item.product.title}
                series={item.product.theme}
                vendor={item.vendor?.namaToko || "CosFit Vendor"}
                price={Number(item.product.originalPrice)}
                status={item.status}
                slug={item.product.slug}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

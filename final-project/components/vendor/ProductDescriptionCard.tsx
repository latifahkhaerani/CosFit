"use client";

import { CheckCircle2 } from "lucide-react";

const included = [
  "Main Costume",
  "Cape",
  "Gloves",
  "Waist Belt",
  "Accessories",
];

const excluded = [
  "Shoes",
  "Weapon",
  "Wig",
];

export default function ProductDescriptionCard() {
  return (
    <section className="card p-7">

      {/* Header */}

      <div className="mb-8">

        <h2 className="card-title">

          Product Details

        </h2>

        <p className="card-subtitle">

          Complete information about this costume.

        </p>

      </div>

      {/* Description */}

      <div className="mb-8">

        <h3 className="mb-3 text-lg font-semibold">

          Description

        </h3>

        <p className="leading-8 text-[var(--muted)]">

          Premium handmade cosplay costume made with high-quality
          materials for conventions, photoshoots, and competitions.
          Comfortable to wear and carefully maintained after every
          rental.

        </p>

      </div>

      {/* Grid */}

      <div className="grid grid-cols-2 gap-8">

        {/* Included */}

        <div>

          <h3 className="mb-5 text-lg font-semibold">

            Included Items

          </h3>

          <div className="space-y-4">

            {included.map((item) => (

              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl bg-[#FCFBFA] p-4"
              >

                <CheckCircle2
                  size={18}
                  className="text-green-600"
                />

                {item}

              </div>

            ))}

          </div>

        </div>

        {/* Excluded */}

        <div>

          <h3 className="mb-5 text-lg font-semibold">

            Not Included

          </h3>

          <div className="space-y-4">

            {excluded.map((item) => (

              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl bg-[#FCFBFA] p-4"
              >

                <div className="h-2 w-2 rounded-full bg-red-400" />

                {item}

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}
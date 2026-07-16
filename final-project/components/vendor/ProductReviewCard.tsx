"use client";

import { Star } from "lucide-react";

const reviews = [
  {
    user: "Sarah",
    rating: 5,
    comment:
      "Amazing quality! The costume looked exactly like the photos.",
  },
  {
    user: "Kevin",
    rating: 5,
    comment:
      "Comfortable to wear and very clean. Highly recommended.",
  },
];

export default function ProductReviewCard() {
  return (
    <section className="card p-7">

      <div className="mb-7">

        <h2 className="card-title">

          Customer Reviews

        </h2>

        <p className="card-subtitle">

          What renters say about this costume.

        </p>

      </div>

      <div className="space-y-5">

        {reviews.map((review) => (

          <div
            key={review.user}
            className="rounded-3xl bg-[#FCFBFA] p-5"
          >

            <div className="mb-3 flex items-center justify-between">

              <h4 className="font-semibold">

                {review.user}

              </h4>

              <div className="flex gap-1">

                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    fill="#F59E0B"
                    color="#F59E0B"
                  />
                ))}

              </div>

            </div>

            <p className="leading-7 text-[var(--muted)]">

              {review.comment}

            </p>

          </div>

        ))}

      </div>

    </section>
  );
}
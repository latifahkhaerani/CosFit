"use client";

import UsageHistoryRow from "./UsageHistoryRow";

const history = [
  {
    date: "May 20, 2025",
    image: "/images/costume1.jpg",
    costume: "Frieren Costume",
    character: "Frieren",
    credit: 1,
  },
  {
    date: "May 18, 2025",
    image: "/images/costume2.jpg",
    costume: "Saber Dress",
    character: "Saber",
    credit: 1,
  },
  {
    date: "May 16, 2025",
    image: "/images/costume3.jpg",
    costume: "Zero Two Pilot Suit",
    character: "Zero Two",
    credit: 1,
  },
  {
    date: "May 15, 2025",
    image: "/images/costume4.jpg",
    costume: "Shenhe Costume",
    character: "Shenhe",
    credit: 1,
  },
  {
    date: "May 12, 2025",
    image: "/images/costume5.jpg",
    costume: "Scarlet Witch",
    character: "Wanda",
    credit: 1,
  },
];

export default function UsageHistory() {
  return (
    <section className="card p-8">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="card-title">

            Usage History

          </h2>

          <p className="card-subtitle">

            Your previous AI generations.

          </p>

        </div>

        <button className="secondary-btn">

          View All

        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="text-left text-sm text-[var(--muted)]">

              <th className="pb-4">Date</th>

              <th>Costume</th>

              <th>Character</th>

              <th>Credits</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {history.map((item) => (

              <UsageHistoryRow
                key={item.date + item.costume}
                {...item}
              />

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}
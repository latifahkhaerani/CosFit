"use client";

const history = [
  {
    user: "Sarah",
    start: "12 Jun",
    end: "15 Jun",
    status: "Completed",
  },
  {
    user: "Kevin",
    start: "18 Jun",
    end: "21 Jun",
    status: "Active",
  },
  {
    user: "Rina",
    start: "26 Jun",
    end: "29 Jun",
    status: "Upcoming",
  },
];

export default function RentalHistoryCard() {
  return (
    <section className="card p-7">

      <div className="mb-7">

        <h2 className="card-title">

          Rental History

        </h2>

        <p className="card-subtitle">

          Recent costume rentals

        </p>

      </div>

      <div className="space-y-4">

        {history.map((item) => (

          <div
            key={item.user}
            className="flex items-center justify-between rounded-3xl bg-[#FCFBFA] p-5"
          >

            <div>

              <h4 className="font-semibold">

                {item.user}

              </h4>

              <p className="text-sm text-[var(--muted)]">

                {item.start} — {item.end}

              </p>

            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                item.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : item.status === "Active"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {item.status}
            </span>

          </div>

        ))}

      </div>

    </section>
  );
}
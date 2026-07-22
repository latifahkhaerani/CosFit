"use client";

import { GetSavedLook } from "@/app/types";
import UsageHistoryRow from "./UsageHistoryRow";
import Link from "next/link";

type Props = {
  history: GetSavedLook[];
};

export default function UsageHistory({ history }: Props) {
  return (
    <section className="card p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="card-title">Usage History</h2>

          <p className="card-subtitle">Your previous AI generations.</p>
        </div>

        <Link href="/profile" className="secondary-btn">
          View All
        </Link>
      </div>

      {history.length === 0 ? (
        <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-border bg-[#FCFAF8]">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-[#1f1a17]">
              No generation history
            </h3>

            <p className="mt-2 text-sm text-muted">
              Your AI try-on history will appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-sm text-muted">
                <th className="pb-4">Date</th>
                <th className="pb-4">Generated Look</th>
                <th className="pb-4">Theme</th>
                <th className="pb-4">Credits</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item) => (
                <UsageHistoryRow
                  key={item._id}
                  date={new Date(item.createdAt).toLocaleDateString("id-ID")}
                  image={item.AiImgUrl}
                  costume={item.Name}
                  character={item.Theme}
                  credit={1}
                  status="Completed"
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

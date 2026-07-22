"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

type Props = {
  date: string;
  image: string;
  costume: string;
  character: string;
  credit: number;
  status: string;
};

export default function UsageHistoryRow({
  date,
  image,
  costume,
  character,
  credit,
}: Props) {
  return (
    <tr className="border-t border-[var(--border)] transition hover:bg-[#FCFBFA]">
      <td className="py-5 text-sm text-[var(--muted)]">{date}</td>

      <td>
        <div className="flex items-center gap-4">
          <Image
            src={image}
            alt={costume}
            width={58}
            height={58}
            className="rounded-2xl py-2 object-cover"
          />

          <div>
            <h4 className="font-semibold">{costume}</h4>

            <p className="text-sm text-[var(--muted)]">AI Try-On</p>
          </div>
        </div>
      </td>

      <td>{character}</td>

      <td>
        <span className="font-semibold text-left">-{credit}</span>
      </td>

      <td>
        <span className="badge-success">
          <CheckCircle2 size={13} className="mr-1" />
          Completed
        </span>
      </td>
    </tr>
  );
}

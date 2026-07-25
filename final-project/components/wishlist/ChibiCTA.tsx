import Image from "next/image";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function ChibiCTA() {
  return (
    <div className="mt-8 flex justify-center">
      <div className="flex w-full items-center gap-6 rounded-3xl border border-[#F3D9CF] bg-[#fcfbfa] px-6 py-5 shadow-sm">
        <Image
          src="/images/chibi.png"
          width={110}
          height={110}
          alt="Mascot"
          className=" shrink-0"
        />

        <div className="flex flex-1 items-center justify-between gap-8">
          <div>
            <h3 className="text-lg font-semibold text-[var(--text)]">
              Let&apos;s find your perfect cosplay!
            </h3>

            <p className="mt-1 max-w-md text-sm text-[#849282]">
              Explore hundreds of costumes and discover your next favorite
              character.
            </p>
          </div>

          <Link
            href="/marketplace"
            className="shrink-0 rounded-full bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            <span className="flex items-center gap-2">
              Continue Shopping
              <Heart size={15} fill="currentColor" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

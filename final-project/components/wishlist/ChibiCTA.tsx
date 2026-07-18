import Image from "next/image";
import { Heart } from "lucide-react";

export default function ChibiCTA() {
  return (
    <div className="mt-8 flex items-end justify-end">

      <div className="flex items-center gap-6 rounded-full bg-[#FFF3EF] px-8 py-4 shadow-sm">

        <Image
          src="/images/chibi.png"
          width={120}
          height={120}
          alt="Mascot"
          className="-mt-10"
        />

        <div>

          <h3 className="text-lg font-semibold text-(--text)">
            Let&apos;s find your perfect cosplay!
          </h3>

          <button className="mt-2 flex items-center gap-2 text-sm font-medium text-(--primary)">

            Continue Shopping

            <Heart
              size={16}
              fill="currentColor"
            />

          </button>

        </div>

      </div>

    </div>
  );
}
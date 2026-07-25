"use client";

import Image from "next/image";
import { Download, X } from "lucide-react";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;

  beforeImage: string;
  afterImage: string;

  character: string;
  series: string;
  generatedAt: string;
};

export default function SavedLookModal({
  open,
  onClose,
  beforeImage,
  afterImage,
  character,
  series,
  generatedAt,
}: Props) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", esc);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", esc);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className=" fixed inset-0 left-0 top-0 h-screen w-screen z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[50vw] max-w-5xl h-[88vh] max-h-225 overflow-hidden rounded-4xl bg-white shadow-[0_40px_120px_rgba(0,0,0,.3)] flex flex-col"
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-[#efe4db] px-8 py-6">
          <div>
            <h2 className="text-2xl font-semibold text-[#1f1a17]">
              AI Generated Look
            </h2>

            <p className="mt-1 text-sm text-[#7d746d]">
              Compare your original photo with the AI generated cosplay.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={afterImage}
              download
              target="_blank"
              className="flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-white transition hover:opacity-90"
            >
              <Download size={18} />
              See Result
            </a>

            <button
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#efe4db] hover:bg-[#faf7f4]"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}

        <div className="flex-1 overflow-y-auto">
          <div className="grid h-full gap-6 p-6 lg:grid-cols-2">
            {/* BEFORE */}

            <div>
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-[#FFF4EE] px-4 py-1 text-sm font-semibold text-[#B14744]">
                  BEFORE
                </span>
              </div>

              <div className="relative h-full min-h-75 overflow-hidden rounded-3xl border border-[#efe4db]">
                <Image
                  src={beforeImage}
                  alt="Before"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* AFTER */}

            <div>
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-[#FFF4EE] px-4 py-1 text-sm font-semibold text-[#B14744]">
                  AFTER
                </span>
              </div>

              <div className="relative h-full min-h-75 overflow-hidden rounded-3xl border border-[#efe4db]">
                <Image
                  src={afterImage}
                  alt="After"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="border-t border-[#efe4db] bg-[#FCFAF8] px-8 py-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-[#1f1a17]">
                {character}
              </h3>

              <p className="mt-1 text-[#7d746d]">{series}</p>

              <p className="mt-3 text-sm text-[#9b938c]">
                Generated on {generatedAt}
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-2xl border border-[#efe4db] px-6 py-3 font-medium hover:bg-[#faf7f4]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

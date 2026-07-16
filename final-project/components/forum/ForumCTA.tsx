"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function ForumCTA() {
  return (
    <section className="card relative overflow-hidden p-6">

      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF7F2] via-white to-[#FFF2ED]" />

      {/* Floating Decoration */}

      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#FBE7DE] blur-3xl" />

      <div className="relative">

        <Image
          src="/images/chibi.png"
          alt=""
          width={170}
          height={170}
          className="mx-auto"
        />

        <h3 className="mt-3 text-center text-xl font-semibold">

          Join Our Community ✨

        </h3>

        <p className="mt-2 text-center text-sm leading-7 text-[var(--muted)]">

          Share your cosplay journey,
          ask questions,
          discover amazing creators,
          and meet fellow cosplayers.

        </p>

        <button className="primary-btn mt-6 flex w-full items-center justify-center gap-2">

          <Sparkles size={18} />

          Introduce Yourself

        </button>

      </div>

    </section>
  );
}
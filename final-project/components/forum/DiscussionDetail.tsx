"use client";

import Image from "next/image";
import {
  BadgeCheck,
  CalendarDays,
  MoreHorizontal,
  MessageCircle,
  Bookmark,
  Share2,
  Flag,
  Sparkles,
} from "lucide-react";

export default function DiscussionDetail() {
  return (
    <article className="card overflow-hidden">
      {/* Header */}

      <div className="flex items-start justify-between p-8">
        <div className="flex gap-5">
          <Image
            src="/images/avatar1.jpg"
            alt=""
            width={64}
            height={64}
            className="rounded-full"
          />

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-semibold text-xl">Hana Yuki</h3>

              <span className="badge-warning">Cosplayer</span>

              <BadgeCheck size={18} className="fill-sky-500 text-white" />
            </div>

            <div className="mt-2 flex items-center gap-3 text-sm text-[var(--muted)]">
              <CalendarDays size={15} />
              Posted 2 days ago
              <span>•</span>
              Edited yesterday
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="badge-warning">Cosplay Tips</span>

          <button className="rounded-xl p-2 hover:bg-[#FCFBFA]">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Body */}

      <div className="px-8">
        <h1 className="max-w-4xl text-5xl font-bold leading-tight">
          How to style Frieren&apos;s wig naturally?
        </h1>

        <p className="mt-6 max-w-4xl leading-8 text-[var(--muted)]">
          Hello everyone! I&apos;m currently working on my Frieren cosplay and
          struggling with styling the wig to get that soft natural look.
          <br />
          <br />
          I&apos;ve watched several tutorials but the back volume still feels
          too thick. Does anyone have recommendations for layering, thinning, or
          products that work well?
        </p>
      </div>

      {/* Gallery */}

      <div className="mt-8 grid grid-cols-3 gap-5 px-8">
        <Image
          src="/images/forum/frieren1.jpg"
          alt=""
          width={600}
          height={450}
          className="h-60 w-full rounded-3xl object-cover transition hover:scale-[1.02]"
        />

        <Image
          src="/images/forum/frieren2.jpg"
          alt=""
          width={600}
          height={450}
          className="h-60 w-full rounded-3xl object-cover transition hover:scale-[1.02]"
        />

        {/* Tips Card */}

        <div className="rounded-3xl border border-[var(--border)] bg-[#FCFBFA] p-6">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-[var(--primary)]" />

            <span className="font-semibold">I&apos;ve tried so far</span>
          </div>

          <ol className="space-y-3 text-sm leading-7">
            <li>Layered cut</li>

            <li>Thinned the ends</li>

            <li>Heat resistant spray</li>

            <li>Curled the tips</li>
          </ol>
        </div>
      </div>

      {/* Tags */}

      <div className="mt-7 flex flex-wrap gap-3 px-8">
        {["#CosplayTips", "#Frieren", "#Wig", "#HairStyling", "#Help"].map(
          (tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--border)] bg-[#FFF8F4] px-4 py-2 text-sm text-[var(--primary)]"
            >
              {tag}
            </span>
          ),
        )}
      </div>

      {/* Reaction Bar */}

      <div className="mt-8 flex flex-wrap items-center justify-between border-t border-[var(--border)] px-8 py-5">
        <div className="flex flex-wrap gap-6">
          <button className="flex items-center gap-2 transition hover:text-[var(--primary)]">
            👍
            <span>124</span>
          </button>

          <button className="flex items-center gap-2 transition hover:text-[var(--primary)]">
            ❤️
            <span>52</span>
          </button>

          <button className="flex items-center gap-2 transition hover:text-[var(--primary)]">
            😂
            <span>8</span>
          </button>

          <button className="flex items-center gap-2 transition hover:text-[var(--primary)]">
            👏
            <span>21</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-5">
          <button className="flex items-center gap-2 text-sm hover:text-[var(--primary)]">
            <MessageCircle size={18} />
            Reply
          </button>

          <button className="flex items-center gap-2 text-sm hover:text-[var(--primary)]">
            <Bookmark size={18} />
            Save
          </button>

          <button className="flex items-center gap-2 text-sm hover:text-[var(--primary)]">
            <Share2 size={18} />
            Share
          </button>

          <button className="flex items-center gap-2 text-sm hover:text-red-500">
            <Flag size={18} />
            Report
          </button>
        </div>
      </div>
    </article>
  );
}

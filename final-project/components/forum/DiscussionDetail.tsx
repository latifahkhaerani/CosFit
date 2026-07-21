"use client";

import Image from "next/image";
import { BadgeCheck, CalendarDays, MoreHorizontal } from "lucide-react";

interface detailType {
  _id: string;
  slug: string;
  nameForum: string;
  desc: string;
  tag: string[];
  creatorId: string;
  image: string;
  createdAt: Date;
  creator: creatorType
}
interface creatorType {
  "_id": string;
  "username": string
}

export default function DiscussionDetail({ detail }: { detail: detailType }) {
  const formattedDate = new Date(detail.createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="card overflow-hidden bg-white rounded-2xl border border-[var(--border)] shadow-sm">
      
      {/* 1. HEADER SECTIONS (User Info) */}
      <div className="flex items-start justify-between p-6 sm:p-8">
        <div className="flex gap-4 sm:gap-5">
          <div className="relative h-16 w-16 flex-shrink-0">
            <Image
              src={detail.image || "/images/default-avatar.jpg"}
              alt="Creator Avatar"
              fill
              className="rounded-full object-cover"
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <h3 className="font-semibold text-lg sm:text-xl text-[var(--foreground)]">
                {detail.creator.username}
              </h3>
              <span className="badge-warning text-xs px-2.5 py-0.5 rounded-full font-medium bg-amber-100 text-amber-800">
                User
              </span>
              <BadgeCheck size={18} className="fill-sky-500 text-white" />
            </div>

            <div className="mt-1.5 flex items-center gap-2 text-sm text-[var(--muted)]">
              <CalendarDays size={14} className="opacity-70" />
              <span>Posted {formattedDate}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <button className="rounded-xl p-2 text-[var(--muted)] hover:bg-[#FCFBFA] hover:text-[var(--foreground)] transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* 2. BODY SECTION (Title & Content) */}
      <div className="px-6 sm:px-8">
        <h1 className="max-w-4xl text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[var(--foreground)] tracking-tight">
          {detail.nameForum}
        </h1>

        <p className="mt-4 sm:mt-6 max-w-4xl text-base sm:text-lg leading-relaxed text-[var(--muted)]">
          {detail.desc}
        </p>
      </div>

      {/* 3. TAGS SECTION */}
      {detail.tag && detail.tag.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2 px-6 sm:px-8 pb-6 sm:pb-8">
          {detail.tag.map((t, i) => (
            <span
              key={i}
              className="rounded-full border border-[var(--border)] bg-[#FFF8F4] px-4 py-1.5 text-xs sm:text-sm font-medium text-[var(--primary)] transition-all hover:bg-[var(--primary-light)] cursor-pointer"
            >
              #{t}
            </span>
          ))}
        </div>
      )}

    </article>
  );
}
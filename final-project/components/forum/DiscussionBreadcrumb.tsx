"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function DiscussionBreadcrumb() {
  return (
    <nav className="mb-8 flex items-center gap-2 text-sm">

      <Link
        href="/"
        className="text-[var(--muted)] hover:text-[var(--primary)]"
      >
        Home
      </Link>

      <ChevronRight
        size={15}
        className="text-[var(--muted)]"
      />

      <Link
        href="/forum"
        className="text-[var(--muted)] hover:text-[var(--primary)]"
      >
        Forum
      </Link>

      <ChevronRight
        size={15}
        className="text-[var(--muted)]"
      />

      <span className="font-medium">

        Discussion

      </span>

    </nav>
  );
}
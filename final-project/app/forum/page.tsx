"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, AlertCircle } from "lucide-react";

import ForumCTA from "@/components/forum/ForumCTA";
import DiscussionFilter from "@/components/forum/DiscussionFilter";
import DiscussionCard from "@/components/forum/DiscussionCard";
import TrendingPosts from "@/components/forum/TrendingPosts";
import PopularTags from "@/components/forum/PopularTags";
import OnlineMembers from "@/components/forum/OnlineMembers";
import ForumSidebar from "@/components/forum/ ForumSidebar";

interface creatorType {
  _id: string;
  username: string;
}

interface forumType {
  _id: string;
  slug: string;
  nameForum: string;
  desc: string;
  tag: string[] | string;
  creatorId: string;
  image: string;
  chatId: string[];
  createdAt: string;
  creator: creatorType;
}

function getTimeAgo(dateString: string) {
  if (!dateString) return "Baru saja";

  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();

  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return "Just now";
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

  return past.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ForumPage() {
  const [data, setData] = useState<forumType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(`/api/forum`);
        if (!res.ok) throw new Error("Failed to fetch discussions.");

        const dataJson = await res.json();

        if (Array.isArray(dataJson)) {
          setData(dataJson);
        } else {
          setData([]);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred",
        );
        console.error("Gagal mengambil data forum:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="page-container">
      {/* Header - Dibuat responsif untuk mobile */}
      <section className="mb-10 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1>CosFit Community</h1>
          <p className="mt-3 max-w-3xl text-[var(--muted)]">
            Ask questions, share cosplay experiences, discover tutorials, and
            connect with thousands of cosplayers around the world.
          </p>
        </div>

        <Link
          href="/forum/new"
          className="primary-btn inline-flex shrink-0 items-center gap-2 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
        >
          <Plus size={18} />
          New Discussion
        </Link>
      </section>

      {/* Layout - Dibuat responsif (1 kolom di HP, 2 di tablet, 3 di desktop besar) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[250px_1fr] xl:grid-cols-[280px_1fr_330px]">
        {/* LEFT SIDEBAR (Sembunyi di HP, muncul di tablet+) */}
        <div className="hidden space-y-6 lg:block">
          <ForumSidebar />
        </div>

        {/* CENTER CONTENT */}
        <section>
          <DiscussionFilter />

          <div className="mt-6 space-y-5">
            {/* Status Handling: Loading, Error, Empty, dan Success */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--primary)] border-t-transparent"></div>
                <p className="mt-4 text-[var(--muted)]">
                  Loading discussions...
                </p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-red-50 py-10 text-red-600">
                <AlertCircle size={32} className="mb-2" />
                <p>{error}</p>
              </div>
            ) : data.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-lg font-semibold text-[var(--text)]">
                  No discussions yet
                </p>
                <p className="text-[var(--muted)]">
                  Be the first to start a conversation!
                </p>
              </div>
            ) : (
              data.map((item) => (
                <Link key={item._id} href={`/forum/${item.slug}`}>
                  <DiscussionCard
                    key={item._id}
                    avatar={item.image}
                    author={item.creator?.username || "Anonymous"}
                    verified={false}
                    time={getTimeAgo(item.createdAt)}
                    title={item.nameForum}
                    description={item.desc}
                    tag={
                      Array.isArray(item.tag)
                        ? item.tag
                        : item.tag
                          ? [item.tag]
                          : ["General"]
                    }
                    tagColor="#06B6D4"
                    comments={item.chatId?.length || 0}
                    likes={0}
                    views={0}
                    pinned={false}
                  />
                </Link>
              ))
            )}
          </div>
        </section>

        {/* RIGHT SIDEBAR (Sembunyi di HP & Tablet, muncul di desktop besar) */}
        <div className="hidden space-y-6 xl:block">
          <TrendingPosts />
          <PopularTags />
        </div>
      </div>
    </main>
  );
}

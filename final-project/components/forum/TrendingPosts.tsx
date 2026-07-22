"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Flame, AlertCircle } from "lucide-react";

interface creatorType {
  _id: string;
  username: string;
}

interface forumType {
  _id: string;
  slug: string;
  nameForum: string;
  image: string;
  chatCount?: number;
  chat?: string[];
  creator?: creatorType;
}

export default function TrendingPosts() {
  const [posts, setPosts] = useState<forumType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(`/api/forum?sort=trending&page=1`);
        if (!res.ok) throw new Error("Failed to fetch trending.");

        const dataJson = await res.json();

        if (Array.isArray(dataJson)) {
          setPosts(dataJson.slice(0, 5));
        } else if (dataJson && Array.isArray(dataJson.data)) {
          setPosts(dataJson.data.slice(0, 5));
        } else {
          setPosts([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading trending");
        console.error("Gagal mengambil data trending:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingPosts();
  }, []);

  return (
    <section className="card p-6">
      <div className="mb-6 flex items-center gap-2">
        <Flame size={20} className="text-[#EF4444]" />
        <h3 className="card-title">Trending Forum</h3>
      </div>

      <div className="space-y-5">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-[var(--primary)] border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center rounded-xl bg-red-50 p-4 text-center text-red-600">
            <AlertCircle size={24} className="mb-1" />
            <p className="text-sm">{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">No trending posts yet.</p>
        ) : (
          posts.map((post, index) => {
            const commentsCount = post.chatCount ?? post.chat?.length ?? 0;

            return (
              <Link
                href={`/forum/${post.slug}`}
                key={post._id}
                className="group flex w-full items-start gap-4 rounded-2xl p-2 text-left transition hover:bg-[#FCFBFA]"
              >
                {/* Ranking Number */}
                <div className="mt-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FFF4EF] text-sm font-bold text-[var(--primary)]">
                  {index + 1}
                </div>

                {/* Author Avatar */}
                <Image
                  src={post.image || "/default-avatar.png"}
                  alt={`${post.creator?.username || "Anonymous"}'s avatar`}
                  width={54}
                  height={54}
                  className="h-[54px] w-[54px] shrink-0 rounded-2xl object-cover"
                />

                {/* Post Info */}
                <div className="flex-1">
                  <h4 className="font-semibold line-clamp-2 group-hover:text-[var(--primary)]">
                    {post.nameForum}
                  </h4>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {post.creator?.username || "Anonymous"}
                  </p>
                </div>

                {/* Chat Count */}
                <div className="flex shrink-0 items-center gap-1 text-sm text-[var(--muted)]">
                  <MessageCircle size={15} />
                  {commentsCount}
                </div>
              </Link>
            );
          })
        )}
      </div>
    </section>
  );
}
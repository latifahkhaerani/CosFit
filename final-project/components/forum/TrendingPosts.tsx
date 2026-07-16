"use client";

import Image from "next/image";
import { MessageCircle, Flame } from "lucide-react";

const posts = [
  {
    title: "What was your first cosplay?",
    author: "Yuki_Chan",
    avatar: "/images/avatar1.jpg",
    comments: 128,
  },
  {
    title: "Tips for sewing leather",
    author: "SewMaster",
    avatar: "/images/avatar2.jpg",
    comments: 96,
  },
  {
    title: "Anime makeup tutorial",
    author: "Mua_cos",
    avatar: "/images/avatar3.jpg",
    comments: 85,
  },
  {
    title: "How to make prop weapons",
    author: "WeaponWorks",
    avatar: "/images/avatar4.jpg",
    comments: 73,
  },
];

export default function TrendingPosts() {
  return (
    <section className="card p-6">

      <div className="mb-6 flex items-center gap-2">

        <Flame
          size={20}
          className="text-[#EF4444]"
        />

        <h3 className="card-title">
          Trending Posts
        </h3>

      </div>

      <div className="space-y-5">

        {posts.map((post, index) => (

          <button
            key={post.title}
            className="
            group
            flex
            w-full
            items-start
            gap-4
            rounded-2xl
            p-2
            text-left
            transition
            hover:bg-[#FCFBFA]
            "
          >

            <div className="mt-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#FFF4EF] text-sm font-bold text-[var(--primary)]">

              {index + 1}

            </div>

            <Image
              src={post.avatar}
              alt=""
              width={54}
              height={54}
              className="rounded-2xl"
            />

            <div className="flex-1">

              <h4 className="font-semibold group-hover:text-[var(--primary)]">

                {post.title}

              </h4>

              <p className="mt-1 text-sm text-[var(--muted)]">

                {post.author}

              </p>

            </div>

            <div className="flex items-center gap-1 text-sm text-[var(--muted)]">

              <MessageCircle size={15} />

              {post.comments}

            </div>

          </button>

        ))}

      </div>

    </section>
  );
}
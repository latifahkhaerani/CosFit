"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";

const discussions = [
  {
    title: "Best wigs for elf characters?",
    replies: 18,
    image: "/images/forum/frieren1.jpg",
    time: "2 days ago",
  },
  {
    title: "Frieren cosplay makeup tips",
    replies: 12,
    image: "/images/forum/frieren2.jpg",
    time: "3 days ago",
  },
  {
    title: "How to make elf ears look natural",
    replies: 9,
    image: "/images/forum/frieren3.jpg",
    time: "5 days ago",
  },
  {
    title: "Cloak patterns for mage costumes",
    replies: 7,
    image: "/images/forum/frieren4.jpg",
    time: "1 week ago",
  },
];

export default function RelatedDiscussion() {
  return (
    <section className="card p-6">
      <h3 className="card-title mb-6">Trending Discussions</h3>

      <div className="space-y-5">
        {discussions.map((item) => (
          <button
            key={item.title}
            className="
            group
            flex
            w-full
            gap-3
            rounded-2xl
            p-2
            text-left
            transition
            hover:bg-[#FCFBFA]
            "
          >
            <Image
              src={item.image}
              alt=""
              width={58}
              height={58}
              className="rounded-2xl object-cover"
            />

            <div className="flex-1">
              <h4 className="font-medium leading-snug group-hover:text-[var(--primary)]">
                {item.title}
              </h4>

              <div className="mt-2 flex items-center gap-4 text-xs text-[var(--muted)]">
                <div className="flex items-center gap-1">
                  <MessageCircle size={13} />

                  {item.replies}
                </div>

                <span>{item.time}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <button className="secondary-btn mt-6 w-full">
        View All Discussions
      </button>
    </section>
  );
}

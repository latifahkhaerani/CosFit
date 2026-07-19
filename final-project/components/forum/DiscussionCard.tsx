"use client";

import Image from "next/image";
import {
  MessageCircle,
  Heart,
  Eye,
  Bookmark,
  Pin,
  BadgeCheck,
} from "lucide-react";

type Props = {
  avatar: string;
  author: string;
  verified?: boolean;
  title: string;
  description: string;
  tag: string[];
  tagColor: string;
  comments: number;
  likes: number;
  views: number;
  time: string;
  pinned?: boolean;
  preview?: string;
};

export default function DiscussionCard({
  avatar,
  author,
  verified,
  title,
  description,
  tag,
  tagColor,
  comments,
  likes,
  views,
  time,
  pinned,
  preview,
}: Props) {
  return (
    <article
      className="
      card
      group
      overflow-hidden
      p-6
      transition-all
      duration-300

      hover:-translate-y-1
      hover:border-[#F0D9CF]
      hover:shadow-soft
      "
    >
      {pinned && (
        <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-green-700">

          <Pin size={15} />

          PINNED DISCUSSION

        </div>
      )}

      <div className="flex gap-5">

        {/* Avatar */}

        <Image
          src={avatar}
          alt=""
          width={100}
          height={1}
          className="
          rounded-full
          transition
          duration-300
          group-hover:scale-105
          "
        />

        {/* Content */}

        <div className="flex-1">

          <div className="mb-3 flex items-center gap-2">

            <h4 className="font-semibold">

              {author}

            </h4>

            {verified && (
              <BadgeCheck
                size={16}
                className="fill-blue-500 text-white"
              />
            )}

            <span className="text-sm text-[var(--muted)]">

              •

            </span>

            <span className="text-sm text-[var(--muted)]">

              {time}

            </span>

          </div>

          <h2 className="text-[22px] font-semibold">

            {title}

          </h2>

          <p className="mt-2 leading-7 text-[var(--muted)]">

            {description}

          </p>

          {preview && (
            <Image
              src={preview}
              alt=""
              width={320}
              height={180}
              className="mt-5 rounded-3xl"
            />
          )}

          {/* Footer */}

          <div className="mt-6 flex items-center justify-between">

            <div className="flex items-center gap-3">

              {tag.map((e, index) => (
                <span key={index}
                className="rounded-full px-4 py-1.5 text-xs font-medium"
                style={{
                  background: `${tagColor}15`,
                  color: tagColor,
                }}
              >
                {e}
              </span>
              ))}

            </div>

            <div className="flex items-center gap-6 text-sm text-[var(--muted)]">

              <div className="flex items-center gap-2">

                <MessageCircle size={18} />

                {comments}

              </div>

              <div className="flex items-center gap-2">

                <Heart size={18} />

                {likes}

              </div>

              <div className="flex items-center gap-2">

                <Eye size={18} />

                {views}

              </div>

              <button>

                <Bookmark size={18} />

              </button>

            </div>

          </div>

        </div>

      </div>

    </article>
  );
}
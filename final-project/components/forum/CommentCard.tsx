"use client";

import Image from "next/image";
import {
  Heart,
  Reply,
  Flag,
  MoreHorizontal,
} from "lucide-react";

type Props = {
  avatar: string;

  name: string;

  role: string;

  roleColor: string;

  time: string;

  content: string;

  likes: number;

  replies?: React.ReactNode;
};

export default function CommentCard({
  avatar,
  name,
  role,
  roleColor,
  time,
  content,
  likes,
  replies,
}: Props) {
  return (
    <div className="card p-6">

      <div className="flex gap-4">

        <Image
          src={avatar}
          alt=""
          width={48}
          height={48}
          className="rounded-full"
        />

        <div className="flex-1">

          {/* Header */}

          <div className="flex items-start justify-between">

            <div>

              <div className="flex items-center gap-3">

                <h4 className="font-semibold">

                  {name}

                </h4>

                <span
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    background: `${roleColor}15`,
                    color: roleColor,
                  }}
                >
                  {role}
                </span>

                <span className="text-xs text-[var(--muted)]">

                  {time}

                </span>

              </div>

            </div>

            <button className="rounded-lg p-2 hover:bg-[#FCFBFA]">

              <MoreHorizontal size={18} />

            </button>

          </div>

          {/* Content */}

          <p className="mt-4 leading-8 text-[var(--text)]">

            {content}

          </p>

          {/* Actions */}

          <div className="mt-5 flex gap-6 text-sm">

            <button className="flex items-center gap-2 hover:text-[var(--primary)]">

              <Heart size={16} />

              {likes}

            </button>

            <button className="flex items-center gap-2 hover:text-[var(--primary)]">

              <Reply size={16} />

              Reply

            </button>

            <button className="flex items-center gap-2 hover:text-red-500">

              <Flag size={16} />

              Report

            </button>

          </div>

          {/* Nested Reply */}

          {replies && (

            <div className="mt-6 border-l-2 border-[var(--border)] pl-6">

              {replies}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}
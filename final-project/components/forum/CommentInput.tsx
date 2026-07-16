"use client";

import Image from "next/image";
import {
  ImagePlus,
  Smile,
  Send,
} from "lucide-react";

export default function CommentInput() {
  return (
    <section className="card p-6">

      <div className="mb-6 flex items-center justify-between">

        <h3 className="card-title">

          Comments (24)

        </h3>

        <button className="text-sm text-[var(--muted)] hover:text-[var(--primary)]">

          Sort by Newest

        </button>

      </div>

      <div className="flex gap-4">

        <Image
          src="/images/avatar1.jpg"
          alt=""
          width={50}
          height={50}
          className="rounded-full"
        />

        <div className="flex-1">

          <textarea
            rows={4}
            placeholder="Write your reply..."
            className="
            input-soft
            min-h-[130px]
            w-full
            resize-none
            "
          />

          <div className="mt-4 flex items-center justify-between">

            <div className="flex gap-3">

              <button className="flex h-11 w-11 items-center justify-center rounded-xl hover:bg-[#FCFBFA]">

                <ImagePlus size={20} />

              </button>

              <button className="flex h-11 w-11 items-center justify-center rounded-xl hover:bg-[#FCFBFA]">

                <Smile size={20} />

              </button>

            </div>

            <button className="primary-btn flex items-center gap-2">

              <Send size={17} />

              Post Reply

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}
"use client";

import { MessageCircleOff, MessagesSquare } from "lucide-react";
import type { GetRoom } from "@/app/types";
import CommentCard from "@/components/forum/CommentCard";
import CommentInput from "@/components/forum/CommentInput";

export interface EventDiscussionMessage {
  _id: string;
  content: string;
  userId: string;
  roomId: string;
  createdAt: string;
  user: {
    _id: string;
    username: string;
    email: string;
  }[];
}

export interface EventForumPreviewProps {
  forum: GetRoom | null;
  initialMessages: EventDiscussionMessage[];
  currentUser: string;
}

export default function EventForumPreview({
  forum,
  initialMessages,
  currentUser,
}: EventForumPreviewProps) {
  return (
    <section className="card p-8">
      <h2 className="card-title">Event Discussion</h2>

      {forum ? (
        <div className="mt-5 space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[var(--background)] text-[var(--primary)]">
              <MessagesSquare size={22} />
            </div>

            <div>
              {forum.tag?.[0] ? (
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                  {forum.tag[0]}
                </p>
              ) : null}

              <p className="text-lg font-semibold">
                {forum.nameForum || "Forum Room"}
              </p>

              <p className="mt-1 line-clamp-2 max-w-md text-sm text-[var(--muted)]">
                {forum.desc || "Discuss this event with fellow cosplayers."}
              </p>
            </div>
          </div>

          <CommentInput
            forumId={forum._id}
            chatLength={initialMessages.length}
          />

          {initialMessages.length > 0 ? (
            <CommentCard
              roomId={forum._id}
              initialMessages={initialMessages}
              currentUser={currentUser}
            />
          ) : (
            <div className="rounded-2xl border border-dashed border-[var(--border)] py-10 text-center">
              <p className="font-medium">Belum ada diskusi</p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Jadilah orang pertama yang memulai percakapan.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-5 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-[var(--border)] py-10 text-center">
          <MessageCircleOff size={32} className="text-[var(--muted)]" />
          <p className="font-medium">No forum available yet</p>
          <p className="text-sm text-[var(--muted)]">
            This event doesn&apos;t have a discussion room yet. Check back
            later.
          </p>
        </div>
      )}
    </section>
  );
}

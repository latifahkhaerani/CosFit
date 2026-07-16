"use client";

import { Sparkles, MessagesSquare, ArrowRight } from "lucide-react";
import type { GetRoom } from "@/app/types";

export interface CommunityDiscussionsProps {
  title?: string;
  viewAllLabel?: string;
  /** Forum rooms users can join to discuss a topic. */
  rooms?: GetRoom[];
  joinLabel?: string;
  onViewAll?: () => void;
  onSelectRoom?: (roomId: string) => void;
}

const placeholderRooms: GetRoom[] = Array.from({ length: 4 }, (_, i) => ({
  _id: `room-${i}`,
  nameForum: "",
  desc: "",
  img: "",
  tag: [""],
}));

function RoomCard({
  room,
  joinLabel,
  onSelect,
}: {
  room: GetRoom;
  joinLabel: string;
  onSelect?: (roomId: string) => void;
}) {
  const tagLabel = room.tag?.[0];

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="aspect-video w-full overflow-hidden bg-cream/30">
        {room.img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={room.img} alt={room.nameForum || "Forum room"} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-base text-muted">
            Room image
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        {tagLabel ? (
          <p className="text-sm font-semibold uppercase tracking-wide text-muted">{tagLabel}</p>
        ) : null}
        <p className="flex items-center gap-2 text-xl font-semibold text-foreground">
          <MessagesSquare className="h-5 w-5 text-accent" />
          {room.nameForum || "Forum Room Name"}
        </p>
        <p className="line-clamp-2 text-base text-muted">
          {room.desc || "Short description of what this room is about."}
        </p>

        <button
          type="button"
          onClick={() => onSelect?.(room._id)}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl border border-primary px-4 py-2.5 text-base font-medium text-primary transition hover:bg-cream/40"
        >
          {joinLabel}
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default function CommunityDiscussions({
  title = "Community Discussions",
  viewAllLabel = "Visit Forum",
  rooms = placeholderRooms,
  joinLabel = "Join Room",
  onViewAll,
  onSelectRoom,
}: CommunityDiscussionsProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-serif text-3xl font-semibold text-foreground">
          {title}
          <Sparkles className="h-5 w-5 text-accent" />
        </h2>
        <button
          type="button"
          onClick={onViewAll}
          className="text-base font-medium text-primary hover:text-secondary"
        >
          {viewAllLabel} &rarr;
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} joinLabel={joinLabel} onSelect={onSelectRoom} />
        ))}
      </div>
    </section>
  );
}

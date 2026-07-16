"use client";

import { Sparkles, MessagesSquare } from "lucide-react";
import type { GetRoom } from "@/app/types";

export interface CommunityDiscussionsProps {
  title?: string;
  viewAllLabel?: string;
  /** Forum rooms users can join to discuss a topic. */
  rooms?: GetRoom[];
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
  onSelect,
}: {
  room: GetRoom;
  onSelect?: (roomId: string) => void;
}) {
  const tagLabel = room.tag?.[0];

  return (
    <button
      type="button"
      onClick={() => onSelect?.(room._id)}
      className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface text-left transition hover:shadow-sm"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-cream/30">
        {room.img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={room.img} alt={room.nameForum || "Forum room"} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted">
            Room image
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        {tagLabel ? (
          <span className="w-fit rounded-full bg-cream/40 px-2.5 py-1 text-[10px] font-medium text-primary">
            {tagLabel}
          </span>
        ) : null}
        <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
          <MessagesSquare className="h-3.5 w-3.5 text-accent" />
          {room.nameForum || "Forum Room Name"}
        </p>
        <p className="line-clamp-2 text-xs text-muted">
          {room.desc || "Short description of what this room is about."}
        </p>
      </div>
    </button>
  );
}

export default function CommunityDiscussions({
  title = "Community Discussions",
  viewAllLabel = "Visit Forum",
  rooms = placeholderRooms,
  onViewAll,
  onSelectRoom,
}: CommunityDiscussionsProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 font-serif text-xl font-semibold text-foreground">
          {title}
          <Sparkles className="h-4 w-4 text-accent" />
        </h2>
        <button
          type="button"
          onClick={onViewAll}
          className="text-sm font-medium text-primary hover:text-secondary"
        >
          {viewAllLabel} &rarr;
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} onSelect={onSelectRoom} />
        ))}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { Heart, Reply, Flag, MoreHorizontal } from "lucide-react";

interface chatType {
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

interface CommentCardProps {
  roomId: string;
  initialMessages: chatType[];
  currentUser: string;
}

export default function CommentCard({ roomId, initialMessages, currentUser }: CommentCardProps) {
  const [messages, setMessages] = useState<chatType[]>(initialMessages);
  const roleColor = "#8B5CF6";

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    socket.connect();
    socket.emit("join_room", roomId);

    const handleReceiveMsg = (newMsg: chatType | chatType[]) => {
      if (Array.isArray(newMsg)) {
        setMessages(newMsg);
      } else {
        setMessages((prevMessages) => [...prevMessages, newMsg]);
      }
    };

    socket.on("receive_msg", handleReceiveMsg);
    return () => {
      socket.off("receive_msg", handleReceiveMsg);
    };
  }, [roomId]);

  return (
    <div className="flex w-full flex-col gap-6 p-4">
      {messages.map((chat) => {
        // Safe access dengan optional chaining
        const username = chat.user?.[0]?.username || "Unknown";
        const isMe = username === currentUser;
        const initialLetter = username.charAt(0).toUpperCase();
        const role = isMe ? "Author" : "Member";

        return (
          <div key={chat._id} className="card rounded-xl border border-[var(--border)] bg-white p-6 shadow-sm">
            <div className="flex gap-4">
              
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-lg text-orange-600 select-none">
                {initialLetter}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-[var(--foreground)]">
                        {username}
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

                      <span className="text-xs text-[var(--muted)] text-muted-foreground">
                        {chat.createdAt
                          ? new Date(chat.createdAt).toLocaleDateString()
                          : "Just now"}
                      </span>
                    </div>
                  </div>

                  <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-[#FCFBFA] hover:text-[var(--foreground)]">
                    <MoreHorizontal size={18} />
                  </button>
                </div>

                <p className="mt-4 whitespace-pre-line leading-8 text-[var(--text)]">
                  {chat.content}
                </p>

                <div className="mt-5 flex gap-6 text-sm text-muted-foreground">
                  <button className="flex items-center gap-2 transition-colors hover:text-[var(--primary)]">
                    <Heart size={16} />
                    0
                  </button>

                  <button className="flex items-center gap-2 transition-colors hover:text-[var(--primary)]">
                    <Reply size={16} />
                    Reply
                  </button>

                  {!isMe && (
                    <button className="flex items-center gap-2 transition-colors hover:text-red-500">
                      <Flag size={16} />
                      Report
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
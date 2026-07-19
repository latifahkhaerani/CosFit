"use client";

import Image from "next/image";
import { ImagePlus, Smile, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { socket } from "@/socket"; 

interface CommentInputProps {
  forumId: string;
  chatLength: number;
}

export default function CommentInput({ forumId, chatLength }: CommentInputProps) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentChatLength, setCurrentChatLength] = useState(chatLength);

  useEffect(() => {
    setCurrentChatLength(chatLength);
  }, [chatLength]);

  useEffect(() => {
    const handleReceiveMsg = (newMsg: any) => {
      const actualMsg = newMsg?.chatData || newMsg?.message || newMsg;

      if (Array.isArray(actualMsg)) {
        setCurrentChatLength(actualMsg.length);
      } else {
        setCurrentChatLength((prev) => prev + 1);
      }
    };
    
    socket.on("receive_msg", handleReceiveMsg);
    
    return () => {
      socket.off("receive_msg", handleReceiveMsg);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/chat/${forumId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message) 
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();

      socket.emit("send_msg", { 
        roomId: forumId, 
        chatData: data.message 
      });

      setMessage("");
    } catch (err) {
      console.error("Gagal mengirim komentar:", err);
      alert(err instanceof Error ? err.message : "Gagal mengirim komentar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card p-6 bg-white border border-[var(--border)] rounded-xl">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-bold text-lg">
          Comments ({currentChatLength})
        </h3>
        <button className="text-sm text-muted-foreground hover:text-[var(--primary)]">
          Sort by Newest
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-4">
        <div className="relative h-12 w-12 flex-shrink-0">
          <Image src="/images/avatar1.jpg" alt="My Avatar" fill className="rounded-full object-cover" />
        </div>

        <div className="flex-1">
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your reply..."
            className="input-soft min-h-[120px] w-full resize-none rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />

          <div className="mt-3 flex items-center justify-between">
            <div className="flex gap-2">
              <button type="button" className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:bg-[#FCFBFA] hover:text-[var(--foreground)]">
                <ImagePlus size={18} />
              </button>

              <button type="button" className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:bg-[#FCFBFA] hover:text-[var(--foreground)]">
                <Smile size={18} />
              </button>
            </div>

            <button 
              type="submit" 
              disabled={loading || !message.trim()}
              className="primary-btn flex items-center gap-2 px-5 py-2.5 bg-[var(--primary)] text-white font-medium rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              <Send size={15} />
              {loading ? "Posting..." : "Post Reply"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
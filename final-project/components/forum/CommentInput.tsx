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
      if (Array.isArray(newMsg)) {
        setCurrentChatLength(newMsg.length);
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
      // PERBAIKAN 1: Gunakan relative path '/api/chat/...' 
      // agar tidak ada masalah CORS/Cookie antara localhost vs 127.0.0.1
      const res = await fetch(`/api/chat/${forumId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // PERBAIKAN 2: Bungkus state message di dalam object 
        // Sesuaikan key-nya (biasanya { message } atau { content })
        body: JSON.stringify(message) 
      });

      // Tangkap pesan error asli dari backend jika masih gagal
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();

      // 3. Jika sukses tersimpan, BROADCAST hasil datanya lewat socket ke room
      // (Pastikan data.message berisi object chat terbaru dari backend)
      socket.emit("send_msg", { 
        roomId: forumId, 
        chatData: data.message 
      });

      // 4. Kosongkan input form
      setMessage("");
    } catch (err) {
      console.error("Gagal mengirim komentar:", err);
      // Opsional: Tampilkan alert/toast ke user agar tahu kenapa gagal
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
        {/* ... (BAGIAN UI KE BAWAH TETAP SAMA PERSIS SEPERTI SEBELUMNYA) ... */}
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
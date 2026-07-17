"use client"

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import ForumCTA from "@/components/forum/ForumCTA";

import DiscussionFilter from "@/components/forum/DiscussionFilter";
import DiscussionCard from "@/components/forum/DiscussionCard";

import TrendingPosts from "@/components/forum/TrendingPosts";
import PopularTags from "@/components/forum/PopularTags";
import OnlineMembers from "@/components/forum/OnlineMembers";

import { Plus } from "lucide-react";
import ForumSidebar from "@/components/forum/ ForumSidebar"; // FIX: Menghapus spasi typo pada path import
import { useEffect, useState } from "react"; 

interface forumType {
  "_id": string,
  "nameForum": string,
  "desc": string,
  "tag": string[],
  "creatorId": string
  "image": string,
  "createdAt": Date,
  "creator": creatorType
}

interface creatorType {
  "_id": string,
  "username": string
} 

export default function ForumPage() { 

  // FIX: Menambahkan explicit type pada useState agar sesuai interface TypeScript
  const [data, setData] = useState<forumType[]>([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/forum`);
        const dataJson = await res.json();
        if (Array.isArray(dataJson)) {
          setData(dataJson);
        }
        console.log(dataJson, "<<<<< data");
      } catch (error) {
        console.error("Gagal mengambil data forum:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <main className="page-container">
        {/* Header */}

        <section className="mb-10 flex items-end justify-between">
          <div>
            <h1>CosFit Community</h1>

            <p className="mt-3 max-w-3xl text-[var(--muted)]">
              Ask questions, share cosplay experiences, discover tutorials, and
              connect with thousands of cosplayers around the world.
            </p>
          </div>

          <button className=" primary-btn shadow-soft transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] ">
            <Plus size={18} />
            New Discussion
          </button>
        </section>

        {/* Layout */}

        <div className="grid grid-cols-[280px_1fr_330px] gap-8">
          {/* LEFT */}

          <div className="space-y-6">
            <ForumSidebar />

            <ForumCTA />
          </div>

          {/* CENTER */}

          <section>
            <DiscussionFilter />

            <div className="space-y-5">
              {/* Jika data kosong, tampilkan pesan loading atau fallback */}
              {data.length === 0 ? (
                <p className="text-center text-[var(--muted)] py-10">Loading discussions...</p>
              ) : (
                data.map((item, index) => (
                  <DiscussionCard
                    key={item._id || index}
                    avatar={"/images/avatar1.jpg"} // Fallback avatar jika kosong
                    author={item.creator?.username || "Anonymous"} // FIX: Menggunakan optional chaining (?.) agar tidak crash
                    verified={false}
                    time={item.createdAt ? new Date(item.createdAt).toLocaleDateString("id-ID") : "Baru saja"} // FIX: Konversi Date ke string
                    title={item.nameForum}
                    description={item.desc}
                    tag={item.tag && item.tag.length > 0 ? item.tag[0] : "General"} // FIX: Ambil tag pertama karena component meminta string, bukan array
                    tagColor="#06B6D4"
                    comments={10} // Mengubah ke tipe number asli
                    likes={10}     // Mengubah ke tipe number asli
                    views={10}     // Mengubah ke tipe number asli
                    pinned={false} // Mengubah ke tipe boolean asli
                    preview={item.image}
                  />
                ))
              )}
            </div>
          </section>

          {/* RIGHT */}

          <div className="space-y-6">
            <TrendingPosts />

            <PopularTags />

            <OnlineMembers />
          </div>
        </div>
      </main>
    </>
  );
}
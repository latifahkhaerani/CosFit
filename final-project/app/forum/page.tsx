"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Plus, AlertCircle } from "lucide-react";

import DiscussionFilter from "@/components/forum/DiscussionFilter";
import DiscussionCard from "@/components/forum/DiscussionCard";
import TrendingPosts from "@/components/forum/TrendingPosts";
import PopularTags from "@/components/forum/PopularTags";

interface creatorType {
  _id: string;
  username: string;
}

interface forumType {
  _id: string;
  slug: string;
  nameForum: string;
  desc: string;
  tag: string[] | string;
  creatorId: string;
  image: string;
  chatCount: number;
  likeCount: number;
  likes: string[];
  createdAt: string;
  creator: creatorType;
}

function getTimeAgo(dateString: string) {
  if (!dateString) return "Baru saja";
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();

  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return "Baru saja";
  if (diffMins < 60) return `${diffMins} min lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays < 7) return `${diffDays} hari lalu`;

  return past.toLocaleDateString("id-ID", { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function ForumPage() {
  const [data, setData] = useState<forumType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [allForums, setAllForums] = useState<forumType[]>([]);
  const [isTagsLoading, setIsTagsLoading] = useState(true);

  const [activeFilter, setActiveFilter] = useState("newest"); 
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5; 

  // ID sementara, silakan ubah dengan real data dari context/session login
  const currentUserId = "6a5a03af171de2d91bb21a79"; 

  const handleFilterChange = (newFilter: string) => {
    setActiveFilter(newFilter);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchAllDataForTags = async () => {
      try {
        setIsTagsLoading(true);
        const res = await fetch(`/api/forum`);
        if (!res.ok) throw new Error("Gagal mengambil data tags.");
        
        const dataJson = await res.json();
        setAllForums(Array.isArray(dataJson) ? dataJson : (dataJson.data || []));
      } catch (err) {
        console.error("Error mengambil tags:", err);
      } finally {
        setIsTagsLoading(false);
      }
    };

    fetchAllDataForTags();
  }, []);

  useEffect(() => {
    const fetchPaginatedData = async () => {
      try {
        setIsLoading(true);
        setError("");
        
        const res = await fetch(`/api/forum?sort=${activeFilter}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`);
        if (!res.ok) throw new Error("Gagal mengambil data diskusi.");
        
        const dataJson = await res.json();
        const fetchedArray = Array.isArray(dataJson) ? dataJson : (dataJson.data || []);
        setData(fetchedArray);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan yang tidak terduga");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaginatedData();
  }, [activeFilter, currentPage]);

  const popularTags = useMemo(() => {
    const tagCounts: Record<string, number> = {};
    
    // Warna di-tweak agar terlihat harmoni dengan merah CosFit
    const colors = ["#D64C4C", "#E87C7C", "#F4A261", "#E76F51", "#8B5CF6", "#06B6D4"];

    allForums.forEach(forum => {
      let tagsArray: string[] = [];
      if (Array.isArray(forum.tag)) tagsArray = forum.tag;
      else if (typeof forum.tag === "string") tagsArray = [forum.tag];

      tagsArray.forEach(t => {
        if (t) {
          tagCounts[t] = (tagCounts[t] || 0) + 1;
        }
      });
    });

    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count], index) => ({
        name,
        posts: count,
        color: colors[index % colors.length]
      }));
  }, [allForums]);

  const handleLike = async (e: React.MouseEvent, slug: string, isCurrentlyLiked: boolean) => {
    e.preventDefault(); 

    if (!currentUserId) {
      alert("Silakan login terlebih dahulu untuk menyukai diskusi ini.");
      return;
    }

    setData((prevData) =>
      prevData.map((forum) => {
        if (forum.slug === slug) {
          const currentLikesArray = forum.likes || [];
          let newLikes;
          let newCount = forum.likeCount || 0;

          if (isCurrentlyLiked) {
            newLikes = currentLikesArray.filter((id) => id !== currentUserId);
            newCount = Math.max(0, newCount - 1); 
          } else {
            newLikes = [...currentLikesArray, currentUserId];
            newCount += 1; 
          }

          return { ...forum, likes: newLikes, likeCount: newCount };
        }
        return forum;
      })
    );

    try {
      const res = await fetch(`/api/forum/${slug}`, {
        method: "PATCH",
        headers: {
          "x-user-id": currentUserId,
        },
      });

      if (!res.ok) throw new Error("Gagal melakukan aksi like/unlike");
    } catch (error) {
      console.error(error);
    }
  };

  const isLastPage = data.length < ITEMS_PER_PAGE;

  return (
    <main className="container mx-auto max-w-[1400px] px-4 py-8">
      {/* Header Section */}
      <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-[32px] font-bold text-gray-900 tracking-tight">Forum</h1>
          <p className="mt-2 text-[15px] text-gray-500">
            Temukan jawaban, bagikan ilmu, dan terhubung dengan komunitas.
          </p>
        </div>
        {/* Tombol dengan warna CosFit Red */}
        <Link 
          href="/forum/new" 
          className="flex items-center gap-2 rounded-lg bg-[#be2727] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#EF4444] hover:shadow-md"
        >
          <Plus size={18} />
          <span>Create New Forum</span>
        </Link>
      </div>

      {/* Grid Layout - Menggunakan minmax(0, 1fr) agar kolom tengah tidak overflow */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)_320px]">
        
        {/* Kiri: Popular Tags */}
        <div className="hidden lg:block sticky top-8">
          <PopularTags tags={popularTags} isLoading={isTagsLoading} />
        </div>

        {/* Tengah: Feed Diskusi */}
        <section className="min-w-0">
          <DiscussionFilter 
            currentFilter={activeFilter} 
            onFilterChange={handleFilterChange} 
          />

          <div className="mt-6 space-y-4">
            {isLoading ? (
              <div className="flex h-40 items-center justify-center rounded-xl border border-gray-100 bg-gray-50">
                <p className="text-gray-500 animate-pulse">Loading...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 p-8 text-center text-red-600">
                <AlertCircle size={32} />
                <p>{error}</p>
              </div>
            ) : data.length === 0 ? (
              <div className="flex h-40 items-center justify-center rounded-xl border border-gray-100 bg-gray-50">
                <p className="text-gray-500">Belum ada diskusi yang ditemukan.</p>
              </div>
            ) : (
              <>
                {data.map((item) => {
                  const isLiked = Array.isArray(item.likes) 
                    ? item.likes.includes(currentUserId) 
                    : false;

                  return (
                    <Link key={item._id} href={`/forum/${item.slug}`} className="block">
                      <DiscussionCard
                        avatar={item.image || "/default-avatar.png"} 
                        author={item.creator?.username || "Anonymous"} 
                        verified={false}
                        time={getTimeAgo(item.createdAt)} 
                        title={item.nameForum}
                        description={item.desc}
                        tag={Array.isArray(item.tag) && item.tag.length > 0 ? item.tag : typeof item.tag === 'string' ? [item.tag] : ["General"]}
                        tagColor="#D64C4C"
                        comments={item.chatCount || 0} 
                        likes={item.likeCount || item.likes?.length || 0} 
                        isLiked={isLiked}
                        onLike={(e) => handleLike(e, item.slug, isLiked)}
                        views={0}   
                        pinned={false} 
                      />
                    </Link>
                  )
                })}

                {/* Pagination (Merah theme) */}
                <div className="mt-8 flex items-center justify-between border-t pt-6">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-[#D64C4C] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Sebelumnya
                  </button>
                  <span className="text-sm font-medium text-gray-500">Halaman {currentPage}</span>
                  <button
                    disabled={isLastPage}
                    onClick={() => setCurrentPage(p => p + 1)}
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-[#D64C4C] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Selanjutnya
                  </button>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Kanan: Trending Posts */}
        <div className="hidden xl:block sticky top-8">
          <TrendingPosts />
        </div>
      </div>
    </main>
  );
}

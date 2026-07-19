import CommentCard from "@/components/forum/CommentCard";
import CommentInput from "@/components/forum/CommentInput";
import DiscussionBreadcrumb from "@/components/forum/DiscussionBreadcrumb";
import DiscussionDetail from "@/components/forum/DiscussionDetail";
import DiscussionInfo from "@/components/forum/DiscussionInfo";
import RelatedDiscussion from "@/components/forum/RelatedDiscussion";
import TopContributors from "@/components/forum/TopContributors";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function DiscussionPage({ params }: Props) {
  const { slug } = await params;
  const cookieStore = await cookies();
  
  // 1. Fetch Detail Forum
  const res = await fetch(`http://localhost:3000/api/forum/${slug}`);
  if (!res.ok) return <main className="page-container py-20 text-center">Forum tidak ditemukan.</main>;
  const forumById = await res.json();

  // 2. Fetch Data Chat (Initial load SSR)
  const res2 = await fetch(`http://localhost:3000/api/chat/${forumById._id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  const chatData = await res2.json();

  return (
    <main className="page-container">
      <DiscussionBreadcrumb />

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
        <Link
          href="/forum"
          className="fixed bottom-8 left-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-soft transition hover:scale-105"
        >
          <ArrowLeft />
        </Link>
        
        {/* LEFT COLUMN */}
        <section className="space-y-8">
          <DiscussionDetail key={forumById._id} detail={forumById} />

          {/* Lempar forumId & jumlah chat awal ke input */}
          <CommentInput 
            forumId={forumById._id} 
            chatLength={chatData?.message?.length || 0} 
          />

          <div className="space-y-5">
            {/* Lempar data initial ke CommentCard */}
            <CommentCard 
              key={forumById._id} 
              roomId={forumById._id} 
              initialMessages={chatData?.message || []} 
              currentUser={chatData?.username || ""}
            />
            
            {/* Tampilan jika room chat masih kosong */}
            {(!chatData?.message || chatData.message.length === 0) && (
              <div className="card py-20 text-center">
                <MessageCircle size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3>No replies yet</h3>
                <p className="subtitle">Be the first one to help.</p>
              </div>
            )}

            {chatData?.message?.length > 0 && (
              <section className="mt-8 flex justify-center">
                <button className="secondary-btn px-10 hover:shadow-card">
                  Load More Comments
                </button>
              </section>
            )}
          </div>
        </section>

        {/* RIGHT COLUMN */}
        <aside className="sticky top-6 h-fit space-y-6">
          <DiscussionInfo />
          <RelatedDiscussion />
          <TopContributors />
        </aside>
      </div>
    </main>
  );
}
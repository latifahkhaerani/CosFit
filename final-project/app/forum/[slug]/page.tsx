import CommentCard from "@/components/forum/CommentCard";
import CommentInput from "@/components/forum/CommentInput";
import DiscussionBreadcrumb from "@/components/forum/DiscussionBreadcrumb";
import DiscussionDetail from "@/components/forum/DiscussionDetail";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import TrendingPosts from "@/components/forum/TrendingPosts";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function DiscussionPage({ params }: Props) {
  const { slug } = await params;
  const cookieStore = await cookies();

  const res = await fetch(`http://localhost:3000/api/forum/${slug}`,{
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  
  if (!res.ok) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center text-center font-medium text-gray-500">
        Forum tidak ditemukan.
      </main>
    );
  }
  
  const forumById = await res.json();

  const res2 = await fetch(`http://localhost:3000/api/chat/${forumById._id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  const chatData = await res2.json();

  return (
    <main className="min-h-screen px-4 pb-24 pt-8 md:px-8 lg:mx-auto lg:max-w-[1280px]">
      {/* BREADCRUMB */}
      <div className="mb-6">
        <DiscussionBreadcrumb />
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* BACK BUTTON */}
        <Link
          href="/forum"
          className="fixed bottom-8 left-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg border border-gray-100 text-gray-600 transition-all hover:scale-110 hover:text-gray-900"
          aria-label="Kembali ke Forum"
        >
          <ArrowLeft size={24} strokeWidth={2} />
        </Link>
        
        {/* LEFT COLUMN */}
        <section className="flex flex-col space-y-6">
          <div className="w-full">
            <DiscussionDetail key={forumById._id} detail={forumById} />
          </div>

          <div className="w-full">
            <CommentInput 
              forumId={forumById._id} 
              chatLength={chatData?.message?.length || 0} 
              image={chatData?.image}
            />
          </div>

          <div className="flex flex-col space-y-4">
            {chatData?.message && chatData.message.length > 0 ? (
              <CommentCard 
                key={forumById._id} 
                roomId={forumById._id} 
                initialMessages={chatData?.message || []} 
                currentUser={chatData?.username || ""}
                image={chatData?.image}
              />
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-16 text-center shadow-sm border border-gray-100">
                <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold text-gray-800">No replies yet</h3>
                <p className="text-sm text-gray-500 mt-1">Be the first one to help.</p>
              </div>
            )}
          </div>
        </section>

        {/* RIGHT COLUMN */}
        <aside className="sticky top-8 h-fit w-full">
          <TrendingPosts/>
        </aside>
      </div>
    </main>
  );
}
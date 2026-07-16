import CommentCard from "@/components/forum/CommentCard";
import CommentInput from "@/components/forum/CommentInput";
import DiscussionBreadcrumb from "@/components/forum/DiscussionBreadcrumb";
import DiscussionDetail from "@/components/forum/DiscussionDetail";
import DiscussionInfo from "@/components/forum/DiscussionInfo";
import RelatedDiscussion from "@/components/forum/RelatedDiscussion";
import TopContributors from "@/components/forum/TopContributors";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function DiscussionPage() {
  return (
    <main className="page-container">
      <DiscussionBreadcrumb />

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
        <Link
          href="/forum"
          className=" fixed bottom-8 left-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-soft transition hover:scale-105 "
        >
          <ArrowLeft />
        </Link>
        {/* LEFT COLUMN */}
        <section className="space-y-8">
          <DiscussionDetail />

          <CommentInput />

          <div className="space-y-5">
            <CommentCard
              avatar="/images/avatar2.jpg"
              name="Mika Chan"
              role="Vendor"
              roleColor="#8B5CF6"
              time="2 days ago"
              likes={18}
              content="I recommend using a thinner for the back layers. It really helps reduce bulk while keeping the wig natural."
              replies={
                <CommentCard
                  avatar="/images/avatar1.jpg"
                  name="Hana Yuki"
                  role="Cosplayer"
                  roleColor="#F97316"
                  time="2 days ago"
                  likes={4}
                  content="Thank you! Which thinner brand do you recommend?"
                  replies={
                    <CommentCard
                      avatar="/images/avatar2.jpg"
                      name="Mika Chan"
                      role="Vendor"
                      roleColor="#8B5CF6"
                      time="2 days ago"
                      likes={2}
                      content="I use Feather Styling Razor. It works perfectly."
                    />
                  }
                />
              }
            />

            <CommentCard
              avatar="/images/avatar3.jpg"
              name="Ryuunosuke"
              role="Moderator"
              roleColor="#10B981"
              time="Yesterday"
              likes={21}
              content="Here's a YouTube tutorial that might help. The layering technique shown there is beginner-friendly."
            />
            {/* if empty comment */}
            <div className=" card py-20 text-center ">
              <MessageCircle
                size={48}
                className="mx-auto mb-4 text-(--muted)"
              />

              <h3>No replies yet</h3>

              <p className="subtitle">Be the first one to help.</p>
            </div>
            <section className="mt-8 flex justify-center">
              <button className=" secondary-btn px-10 hover:shadow-card">
                Load More Comments
              </button>
            </section>
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

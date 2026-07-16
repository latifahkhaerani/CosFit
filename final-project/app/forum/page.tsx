import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import ForumCTA from "@/components/forum/ForumCTA";

import DiscussionFilter from "@/components/forum/DiscussionFilter";
import DiscussionCard from "@/components/forum/DiscussionCard";

import TrendingPosts from "@/components/forum/TrendingPosts";
import PopularTags from "@/components/forum/PopularTags";
import OnlineMembers from "@/components/forum/OnlineMembers";

import { Plus } from "lucide-react";
import ForumSidebar from "@/components/forum/ ForumSidebar";

export default function ForumPage() {
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
              <DiscussionCard
                avatar="/images/avatar1.jpg"
                author="Hikari Cos"
                verified
                time="4 hours ago"
                title="How do I style a wig without damaging it?"
                description="I'm preparing for my first cosplay event and I'm worried about styling synthetic wigs. Does anyone have beginner-friendly tips?"
                tag="Cosplay Tips"
                tagColor="#F97316"
                comments={28}
                likes={152}
                views={1234}
                pinned
                preview="/images/forum1.jpg"
              />

              <DiscussionCard
                avatar="/images/avatar2.jpg"
                author="Akira"
                time="6 hours ago"
                title="Best place to rent Genshin costumes?"
                description="Looking for premium quality costumes around Jakarta. Any recommendations?"
                tag="Costume Discussion"
                tagColor="#EC4899"
                comments={19}
                likes={84}
                views={892}
              />

              <DiscussionCard
                avatar="/images/avatar3.jpg"
                author="Yuki"
                verified
                time="Yesterday"
                title="Photography tips for indoor conventions"
                description="Sharing some camera settings that worked really well during Comic Frontier."
                tag="Photography"
                tagColor="#06B6D4"
                comments={35}
                likes={201}
                views={1870}
                preview="/images/forum2.jpg"
              />
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

      <Footer />
    </>
  );
}

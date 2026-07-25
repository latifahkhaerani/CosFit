import HeroSection from "@/components/home/HeroSection";
import PopularCharacters from "@/components/home/PopularCharacters";
import FeaturedCostumes from "@/components/home/FeaturedCostumes";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import CommunityDiscussions from "@/components/home/CommunityDiscussions";
import CommunityDesigns from "@/components/home/CommunityDesigns";
import HowItWorks from "@/components/home/HowItWorks";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <main className="flex flex-col bg-white">
      <HeroSection />
      <PopularCharacters />
      <FeaturedCostumes />
      <UpcomingEvents />
      <CommunityDiscussions />
      {/* <CommunityDesigns />
      <HowItWorks /> */}
      <CTASection />
    </main>
  );
}

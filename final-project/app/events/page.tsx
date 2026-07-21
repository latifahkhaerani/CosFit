import Footer from "@/components/Footer";
import CategoryCard from "@/components/events/CategoryCard";
import CommunityGallery from "@/components/events/CommunityGallery";
import EventNewsletter from "@/components/events/EventNewsletter";
import FeaturedEventCard from "@/components/events/FeaturedEventCard";
import HallOfFame from "@/components/events/HallOfFame";

import HeroEvent from "@/components/events/HeroEvent";
import PastEventCard from "@/components/events/PastEventCard";
import EventsClient from "@/components/events/EventsClient";
import OurEventModel from "@/db/models/ourEventModel";
import UserDesignModel from "@/db/models/userDesignModel";
import serializeEvent from "@/app/helpers/serializeEvent";
import serializeUserDesign from "@/app/helpers/serializeUserDesign";
import { Trophy, Shirt, Scissors, Camera, Ticket, Users } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = (await OurEventModel.getAllEvents()).map(serializeEvent);
  const [featuredEvent, ...upcomingEvents] = events;
  const userDesigns = (await UserDesignModel.getAllUserDesigns()).map(serializeUserDesign);

  return (
    <>
      <main className="page-container space-y-14">
        <HeroEvent />

        <FeaturedEventCard event={featuredEvent} />

        {/* upcoming events (join event flow) */}
        <EventsClient events={upcomingEvents.length > 0 ? upcomingEvents.slice(0, 4) : undefined} />

        {/* category */}
        <section>
          <div className="mb-8">
            <h2 className="card-title">Explore by Category</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-6">
            <CategoryCard
              title="Contest"
              color="#D95D4F"
              icon={<Trophy size={34} />}
            />

            <CategoryCard
              title="Fashion"
              color="#EC4899"
              icon={<Shirt size={34} />}
            />

            <CategoryCard
              title="Workshop"
              color="#F59E0B"
              icon={<Scissors size={34} />}
            />

            <CategoryCard
              title="Photoshoot"
              color="#3B82F6"
              icon={<Camera size={34} />}
            />

            <CategoryCard
              title="Convention"
              color="#10B981"
              icon={<Ticket size={34} />}
            />

            <CategoryCard
              title="Gathering"
              color="#8B5CF6"
              icon={<Users size={34} />}
            />
          </div>
        </section>

        {/* past event */}
        <section>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="card-title">Past Events</h2>

            <button className="secondary-btn">View All</button>
          </div>

          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
            <PastEventCard
              image="/images/events/past1.jpg"
              title="CosFit Winter Gathering"
              participants="680+"
            />

            <PastEventCard
              image="/images/events/past2.jpg"
              title="Prop Making Contest"
              participants="450+"
            />

            <PastEventCard
              image="/images/events/past3.jpg"
              title="CosFit Easter Parade"
              participants="1,100+"
            />

            <PastEventCard
              image="/images/events/past4.jpg"
              title="Photography Contest"
              participants="780+"
            />
          </div>
        </section>
{/* Hall of Fame (community designs, ranked by votes) */}

<HallOfFame designs={userDesigns} />

<CommunityGallery />

<EventNewsletter />
      </main>
    </>
  );
}
